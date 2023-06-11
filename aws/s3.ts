import S3 from "aws-sdk/clients/s3";

const s3 = new S3({
  region: process.env.NEXT_AWS_REGION,
  credentials: {
    accessKeyId: process.env.NEXT_AWS_ACCESS_KEY || "",
    secretAccessKey: process.env.NEXT_AWS_SECRET_KEY || "",
  },
  signatureVersion: "v4",
});

export default s3;
