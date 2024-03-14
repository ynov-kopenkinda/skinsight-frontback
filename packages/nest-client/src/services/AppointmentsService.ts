/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Appointment } from '../models/Appointment';
import type { CreateAppointmentDto } from '../models/CreateAppointmentDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class AppointmentsService {

  constructor(public readonly httpRequest: BaseHttpRequest) {}

  /**
   * @returns any 
   * @throws ApiError
   */
  public appointmentControllerCreate({
requestBody,
}: {
requestBody: CreateAppointmentDto,
}): CancelablePromise<any> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/appointment',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * @returns Appointment 
   * @throws ApiError
   */
  public appointmentControllerFindOneAppointment({
id,
}: {
id: number,
}): CancelablePromise<Appointment> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/appointment/{id}',
      path: {
        'id': id,
      },
    });
  }

  /**
   * @returns Appointment 
   * @throws ApiError
   */
  public appointmentControllerFindAllForDoctor({
id,
}: {
id: number,
}): CancelablePromise<Array<Appointment>> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/appointment/doctor/{id}',
      path: {
        'id': id,
      },
    });
  }

  /**
   * @returns Appointment 
   * @throws ApiError
   */
  public appointmentControllerFindAllForPatient({
id,
}: {
id: number,
}): CancelablePromise<Array<Appointment>> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/appointment/patient/{id}',
      path: {
        'id': id,
      },
    });
  }

  /**
   * Get all appointment for the user logged
   * @returns Appointment 
   * @throws ApiError
   */
  public appointmentControllerFindAllForOneUser(): CancelablePromise<Array<Appointment>> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/appointment/user',
    });
  }

  /**
   * @returns string 
   * @throws ApiError
   */
  public appointmentControllerAcceptAppointment({
userId,
appointmentId,
}: {
userId: number,
appointmentId: number,
}): CancelablePromise<string> {
    return this.httpRequest.request({
      method: 'PATCH',
      url: '/appointment/{userId}/accept/{appointmentId}',
      path: {
        'userId': userId,
        'appointmentId': appointmentId,
      },
    });
  }

  /**
   * @returns string 
   * @throws ApiError
   */
  public appointmentControllerDeclineAppointment({
userId,
appointmentId,
}: {
userId: number,
appointmentId: number,
}): CancelablePromise<string> {
    return this.httpRequest.request({
      method: 'PATCH',
      url: '/appointment/{userId}/decline/{appointmentId}',
      path: {
        'userId': userId,
        'appointmentId': appointmentId,
      },
    });
  }

  /**
   * @returns Appointment 
   * @throws ApiError
   */
  public appointmentControllerCheckIfAppointmentExists({
patientId,
doctorId,
}: {
patientId: number,
doctorId: number,
}): CancelablePromise<Appointment> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/appointment/checkIfAppointmentExists/{doctorId}/{patientId}',
      path: {
        'patientId': patientId,
        'doctorId': doctorId,
      },
    });
  }

}
