import { Data } from "aws-sdk/clients/firehose";
import s3 from "../../../../aws/s3";
import { randomUUID } from "crypto";
import { StatusCodes } from "http-status-codes";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const extension = req.url?.split("%2F")[1];
        const key = `optimize/picture_${randomUUID()}.${extension}`;
        const s3Params = {
            Bucket: process.env.NEXT_AWS_S3_BUCKET_NAME,
            Key: key,
            Expires: 10,
            ContentType: `image/${extension}`,
        };
        const s3UploadUrl = await s3.getSignedUrlPromise("putObject", s3Params);
        console.log(key)
        const data: Data = { s3UploadUrl, key };
        const responseBody = JSON.stringify(data);


        return NextResponse.json(responseBody, {
            status: StatusCodes.OK,
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error: any) {
        console.error(
            `Failed to generate presigned URL: ${(error as Error).message}`
        );
        return NextResponse.json({ message: "Failed to generate the signed URL" }, {
            status: StatusCodes.INTERNAL_SERVER_ERROR,
        });
    }
}