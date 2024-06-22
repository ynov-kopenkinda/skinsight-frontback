/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreatePreAppointmentDto } from '../models/CreatePreAppointmentDto';
import type { PreAppointment } from '../models/PreAppointment';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class PreAppointmentsService {

  constructor(public readonly httpRequest: BaseHttpRequest) {}

  /**
   * @returns any
   * @throws ApiError
   */
  public preAppointmentControllerCreate({
    requestBody,
  }: {
    requestBody: CreatePreAppointmentDto,
  }): CancelablePromise<any> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/pre-appointment',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * @returns PreAppointment
   * @throws ApiError
   */
  public preAppointmentControllerFindAllForPatient({
    id,
  }: {
    id: number,
  }): CancelablePromise<Array<PreAppointment>> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/pre-appointment/patient/{id}',
      path: {
        'id': id,
      },
    });
  }

}
