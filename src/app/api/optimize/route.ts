import { NextRequest, NextResponse } from "next/server";
import getCurrentUser from "@/actions/getCurrentUser";
import prisma from "@/libs/prismadb";
import { StatusCodes } from "http-status-codes";

import s3 from "../../../../aws/s3";

/**
 * This function retrieves an optimized image from an S3 bucket and checks if the user is authorized to access it.
 * @param {NextRequest} req - req is an object representing the incoming HTTP request.
 * It contains information such as the request method, URL, headers, and query parameters.
 * It is of type NextRequest, which is a custom type defined by the Next.js framework.
 * @returns a NextResponse object that contains the optimized image retrieved from an S3 bucket,
 * with a status code of 200 (OK), if the user is authenticated and authorized to access the image.
 * If the user is not authenticated or authorized, or if the image is not found,
 * the function returns a NextResponse object with an appropriate error message and status code.
 * If there is a generic error, the function returns a NextResponse object with a generic error message and status code.
 */
export async function GET(req: NextRequest) {
  try {
    const key = req.nextUrl.searchParams.get("key");
    if (!key) {
      return NextResponse.json(
        { message: "Invalid Key" },
        { status: StatusCodes.BAD_REQUEST }
      );
    }

    // Check if user is authenticated
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json(
        { message: "User is not authenticated to perform this operation." },
        { status: StatusCodes.UNAUTHORIZED }
      );
    }

    // Check if user is authorized to access the image
    const isAuthorized = await prisma.optimizedImage.findFirst({
      where: { objectKey: key, userId: currentUser.id },
    });
    if (!isAuthorized) {
      return NextResponse.json(
        {
          message: "User is not authorized to perform this operation.",
        },
        { status: StatusCodes.UNAUTHORIZED }
      );
    }

    // Retrieve the optimized image from S3
    const getObjectParams = {
      Bucket: process.env.NEXT_AWS_S3_DESTINATION_BUCKET_NAME!,
      Key: key,
    };
    const response = await s3.getObject(getObjectParams).promise();

    // Check if the response body is a buffer
    if (!(response.Body instanceof Buffer)) {
      throw new Error("Something went wrong.");
    }

    return new NextResponse(response.Body as Buffer, {
      status: StatusCodes.OK,
    });
  } catch (error: any) {
    // Handle specific error codes
    if (error.code === "NoSuchKey") {
      return NextResponse.json(
        { message: "Image not found" },
        { status: StatusCodes.NOT_FOUND }
      );
    }

    // Handle generic error
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
}
