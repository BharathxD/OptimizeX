import { NextRequest, NextResponse } from "next/server";
import getCurrentUser from "@/actions/getCurrentUser";
import prisma from "@/libs/prismadb";
import { StatusCodes } from "http-status-codes";
import { v4 as uuidv4 } from "uuid";

import s3 from "../../../../aws/s3";

/**
 * This function generates a signed URL for S3 upload, creates an optimized image record in the database,
 * and updates the user's optimizedImages array.
 * @param {NextRequest} req - The req parameter is an object representing the incoming HTTP request.
 * It contains information such as the request method, headers, and body. It is of type NextRequest,
 * which is a custom type defined by the Next.js framework.
 * @returns a NextResponse object with a JSON body and status code.
 * The JSON body contains a signed URL for uploading an image to an S3 bucket and a key for the uploaded image.
 * The status code is either 200 OK if the operation is successful or an error code if there is an error.
 */
export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const { fileType, fileName } = await req.json();

    // Check authorization
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json(
        { message: "You are unauthenticated to perform this operation." },
        { status: StatusCodes.FORBIDDEN }
      );
    }

    // Validate params
    if (!fileType || !fileName) {
      return NextResponse.json(
        { message: "Invalid file metadata." },
        { status: StatusCodes.BAD_REQUEST }
      );
    }

    const extension = fileType.replace("image/", "");
    const sourceKey = `optimize/picture_${uuidv4()}.${extension}`;
    const destinationKey = sourceKey.replace("optimize/", "optimized/");

    // Generate signed URL for S3 upload
    const s3Params = {
      Bucket: process.env.NEXT_AWS_S3_SOURCE_BUCKET_NAME,
      Key: sourceKey,
      Expires: 60,
      ContentType: fileType,
    };
    const s3UploadUrl = await s3.getSignedUrlPromise("putObject", s3Params);

    // Set expiration date
    const ONE_DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000;
    const expiredAt = new Date(new Date().getTime() + ONE_DAY_IN_MILLISECONDS);

    // Create optimized image record in the database
    const createdImage = await prisma.optimizedImage.create({
      data: {
        userId: currentUser.id,
        fileName,
        extension,
        objectKey: destinationKey,
        expiresAt: expiredAt,
      },
    });

    // Update user's optimizedImages array
    await prisma.user.update({
      where: { id: currentUser.id },
      data: {
        optimizedImages: {
          push: createdImage.id,
        },
      },
    });

    const responseBody = { s3UploadUrl, key: destinationKey };

    // Return the response with signedUrl and the key
    return NextResponse.json(responseBody, {
      status: StatusCodes.OK,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error: any) {
    // Handle generic error
    return NextResponse.json(
      { message: "Failed to generate the signed URL" },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
}
