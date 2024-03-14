/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateUserDto } from '../models/CreateUserDto';
import type { loginUserDTO } from '../models/loginUserDTO';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class AuthService {

  constructor(public readonly httpRequest: BaseHttpRequest) {}

  /**
   * Create account and login
   * @returns any
   * @throws ApiError
   */
  public authControllerSignup({
    requestBody,
  }: {
    requestBody: CreateUserDto,
  }): CancelablePromise<any> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/auth/signup',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * Login
   * @returns any
   * @throws ApiError
   */
  public authControllerSignin({
    requestBody,
  }: {
    requestBody: loginUserDTO,
  }): CancelablePromise<any> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/auth/signin',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * Refresh token
   * @returns any
   * @throws ApiError
   */
  public authControllerRefreshTokens(): CancelablePromise<any> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/auth/refresh',
    });
  }

}
