/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ChatDto } from '../models/ChatDto';
import type { CreateChatDto } from '../models/CreateChatDto';
import type { GetChatByUserId } from '../models/GetChatByUserId';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class ChatService {

  constructor(public readonly httpRequest: BaseHttpRequest) {}

  /**
   * Get a chat depending on passed id
   * @returns ChatDto
   * @throws ApiError
   */
  public chatControllerGetChat({
    id,
  }: {
    id: number,
  }): CancelablePromise<ChatDto> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/chat/{id}',
      path: {
        'id': id,
      },
    });
  }

  /**
   * Delete a chat depending on passed id
   * @returns ChatDto
   * @throws ApiError
   */
  public chatControllerDeleteChat({
    id,
  }: {
    id: number,
  }): CancelablePromise<ChatDto> {
    return this.httpRequest.request({
      method: 'DELETE',
      url: '/chat/{id}',
      path: {
        'id': id,
      },
    });
  }

  /**
   * Create a chat depending on passed id
   * @returns ChatDto
   * @throws ApiError
   */
  public chatControllerCreateChat({
    requestBody,
  }: {
    requestBody: CreateChatDto,
  }): CancelablePromise<ChatDto> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/chat',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * Get chat(s) where an user appear
   * @returns GetChatByUserId
   * @throws ApiError
   */
  public chatControllerGetChatByUserId({
    id,
  }: {
    id: number,
  }): CancelablePromise<Array<GetChatByUserId>> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/chat/user/{id}',
      path: {
        'id': id,
      },
    });
  }

}
