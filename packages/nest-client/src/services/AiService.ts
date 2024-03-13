/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateAiDto } from '../models/CreateAiDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class AiService {

  constructor(public readonly httpRequest: BaseHttpRequest) {}

  /**
   * @returns any 
   * @throws ApiError
   */
  public aiControllerSendMessage({
requestBody,
}: {
requestBody: CreateAiDto,
}): CancelablePromise<any> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/ai',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

}
