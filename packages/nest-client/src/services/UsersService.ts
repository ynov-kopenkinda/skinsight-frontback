/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateUserDto } from '../models/CreateUserDto';
import type { PatchUserDto } from '../models/PatchUserDto';
import type { User } from '../models/User';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class UsersService {

  constructor(public readonly httpRequest: BaseHttpRequest) {}

  /**
   * @returns User 
   * @throws ApiError
   */
  public usersControllerGetUsers(): CancelablePromise<Array<User>> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/users',
    });
  }

  /**
   * Create a user
   * @returns User 
   * @throws ApiError
   */
  public usersControllerCreateUser({
requestBody,
}: {
requestBody: CreateUserDto,
}): CancelablePromise<User> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/users',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * @returns User 
   * @throws ApiError
   */
  public usersControllerGetDoctors(): CancelablePromise<Array<User>> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/users/doctors',
    });
  }

  /**
   * Get a user depending on passed id
   * @returns User 
   * @throws ApiError
   */
  public usersControllerGetUserById({
id,
}: {
id: number,
}): CancelablePromise<User> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/users/{id}',
      path: {
        'id': id,
      },
    });
  }

  /**
   * Update a user depending on passed id
   * @returns User 
   * @throws ApiError
   */
  public usersControllerUpdateUser({
id,
requestBody,
}: {
id: number,
requestBody: PatchUserDto,
}): CancelablePromise<User> {
    return this.httpRequest.request({
      method: 'PATCH',
      url: '/users/{id}',
      path: {
        'id': id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * Delete a user depending on passed id
   * @returns User 
   * @throws ApiError
   */
  public usersControllerDeleteUser({
id,
}: {
id: number,
}): CancelablePromise<User> {
    return this.httpRequest.request({
      method: 'DELETE',
      url: '/users/{id}',
      path: {
        'id': id,
      },
    });
  }

  /**
   * Create a doctor
   * @returns User 
   * @throws ApiError
   */
  public usersControllerCreateDoctor({
requestBody,
}: {
requestBody: CreateUserDto,
}): CancelablePromise<User> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/users/doctor',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

}
