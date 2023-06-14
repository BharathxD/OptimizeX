import { StatusCodes } from "http-status-codes";
import { NextRequest, NextResponse } from "next/server";
import s3 from "../../../../aws/s3";
import getCurrentUser from "@/actions/getCurrentUser";

const MAX_RETRIES = 5;
const RETRY_DELAY = 5000;

async function downloadFileFromS3(key: string, fileMetadata: { name: string, type: string }, retries = MAX_RETRIES): Promise<NextResponse> {
    try {
        const getObjectParams = {
            Bucket: process.env.NEXT_AWS_S3_DESTINATION_BUCKET_NAME!,
            Key: key,
        };
        const response = await s3.getObject(getObjectParams).promise();

        if (response.Body) {
            return new NextResponse(response.Body as ArrayBuffer, {
                status: StatusCodes.OK,
                headers: {
                    "Content-Type": fileMetadata.type,
                    "Content-Disposition": `attachment; filename=${fileMetadata.name}`,
                },
            });
        } else {
            return new NextResponse(null, { status: StatusCodes.NOT_FOUND });
        }
    } catch (error: any) {
        if (error.code === "NoSuchKey") {
            if (retries > 0) {
                await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
                return downloadFileFromS3(key, fileMetadata, retries - 1);
            } else {
                return new NextResponse(
                    JSON.stringify({
                        message:
                            "Sorry, it's taking too long to process. You can check your profile later to download it.",
                    }),
                    { status: StatusCodes.NOT_FOUND }
                );
            }
        } else {
            console.error(error);
            return new NextResponse(null, {
                status: StatusCodes.INTERNAL_SERVER_ERROR,
            });
        }
    }
}

export async function POST(req: NextRequest) {
    try {
        const currentUser = await getCurrentUser();
        if (!currentUser) {
            return NextResponse.json({ message: "User is not authenticated to perform this operation" }, { status: StatusCodes.UNAUTHORIZED });
        }
        const { key, file } = await req.json();
        const response = await downloadFileFromS3(key, file, 10);
        return response;
    } catch (error: any) {
        console.error(error);
        return new NextResponse(null, {
            status: StatusCodes.INTERNAL_SERVER_ERROR,
        });
    }
}