import s3 from "../../aws/s3";

const MAX_RETRIES = 5;
const RETRY_DELAY = 5000;

const pollOptimizedImageFromS3 = async (
  key: string,
  fileMetadata: { name: string; type: string },
  retries = MAX_RETRIES
): Promise<Buffer | null> => {
  try {
    const getObjectParams = {
      Bucket: process.env.NEXT_AWS_S3_DESTINATION_BUCKET_NAME!,
      Key: key,
    };
    const response = await s3.getObject(getObjectParams).promise();
    if (response.Body instanceof Buffer) return response.Body;
    return null;
  } catch (error: any) {
    if (error.code === "NoSuchKey") {
      if (!(retries > 0)) return null;
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
      return pollOptimizedImageFromS3(key, fileMetadata, retries - 1);
    }
    return null;
  }
};

export default pollOptimizedImageFromS3;
