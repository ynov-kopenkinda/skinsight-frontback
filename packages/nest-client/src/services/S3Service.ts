/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SignedPostUrlResponse } from '../models/SignedPostUrlResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class S3Service {

  constructor(public readonly httpRequest: BaseHttpRequest) {}

  /**
   * @returns SignedPostUrlResponse
   * @throws ApiError
   */
  public s3ControllerGetSignedPostUrl({
    userId,
  }: {
    userId: number,
  }): CancelablePromise<SignedPostUrlResponse> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/s3/signed-post-url',
      query: {
        'userId': userId,
      },
    });
  }

  /**
   * @returns string
   * @throws ApiError
   */
  public s3ControllerGetSignedGetUrl({
    s3Key,
  }: {
    s3Key: string,
  }): CancelablePromise<string> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/s3/signed-get-url',
      query: {
        's3key': s3Key,
      },
    });
  }

}
