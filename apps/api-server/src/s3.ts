import { S3Client } from "@aws-sdk/client-s3";

console.log(process.env.BUCKET_REGION, "PD");
export const s3 = new S3Client({
  region: process.env.BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  },
});
