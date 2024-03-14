/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateChatEventDto } from '../models/CreateChatEventDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class ChatEventService {

  constructor(public readonly httpRequest: BaseHttpRequest) {}

  /**
   * @returns any 
   * @throws ApiError
   */
  public chatEventControllerGetChatEventsFromChatId({
chatId,
}: {
chatId: number,
}): CancelablePromise<any> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/chat-event/{chatId}',
      path: {
        'chatId': chatId,
      },
    });
  }

  /**
   * Get a chat-event depending on passed chat id
   * @returns any 
   * @throws ApiError
   */
  public chatEventControllerCreateChatEvent({
requestBody,
}: {
requestBody: CreateChatEventDto,
}): CancelablePromise<any> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/chat-event/{chatId}',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

}
