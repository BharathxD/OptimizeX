import { NextResponse } from "next/server";
import s3 from "../../aws/s3";
import { StatusCodes } from "http-status-codes";

const MAX_RETRIES = 5;
const RETRY_DELAY = 5000;

const pollOptimizedImageFromS3 = async (key: string, fileMetadata: { name: string, type: string }, retries = MAX_RETRIES): Promise<NextResponse> => {
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
                return pollOptimizedImageFromS3(key, fileMetadata, retries - 1);
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

export default pollOptimizedImageFromS3;