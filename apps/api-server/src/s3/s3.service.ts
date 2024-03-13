import * as aws from "@aws-sdk/client-s3";
import * as s3RequestPresigner from "@aws-sdk/s3-request-presigner";
import { Injectable } from "@nestjs/common";

import { s3 } from "../s3";

@Injectable()
export class S3Service {
  constructor() {}

  getBucketParams = (id: number) => ({
    Bucket: process.env.AWS_BUCKET,
    Key: `kopenkinda-skinsight/${id}/${Date.now() + Math.random()}`,
    ContentType: "image/*",
  });

  getSignedPostUrl = async (id: number) => {
    const params = this.getBucketParams(id);
    return {
      url: await s3RequestPresigner.getSignedUrl(
        s3,
        new aws.PutObjectCommand(params),
        {
          expiresIn: 60,
        },
      ),
      key: params.Key,
    };
  };

  getSignedGetUrl = async (s3key: string) => {
    const params = {
      Bucket: process.env.AWS_BUCKET,
      Key: s3key,
    };
    const command = new aws.GetObjectCommand(params);
    return await s3RequestPresigner.getSignedUrl(s3, command, {
      expiresIn: 300,
    });
  };
}
