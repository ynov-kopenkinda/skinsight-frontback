/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseHttpRequest } from './core/BaseHttpRequest';
import type { OpenAPIConfig } from './core/OpenAPI';
import { FetchHttpRequest } from './core/FetchHttpRequest';

import { AppointmentsService } from './services/AppointmentsService';
import { AuthService } from './services/AuthService';
import { ChatService } from './services/ChatService';
import { ChatEventService } from './services/ChatEventService';
import { PreAppointmentsService } from './services/PreAppointmentsService';
import { S3Service } from './services/S3Service';
import { UsersService } from './services/UsersService';

type HttpRequestConstructor = new (config: OpenAPIConfig) => BaseHttpRequest;

export class NestApi {

  public readonly appointments: AppointmentsService;
  public readonly auth: AuthService;
  public readonly chat: ChatService;
  public readonly chatEvent: ChatEventService;
  public readonly preAppointments: PreAppointmentsService;
  public readonly s3: S3Service;
  public readonly users: UsersService;

  public readonly request: BaseHttpRequest;

  constructor(config?: Partial<OpenAPIConfig>, HttpRequest: HttpRequestConstructor = FetchHttpRequest) {
    this.request = new HttpRequest({
      BASE: config?.BASE ?? '',
      VERSION: config?.VERSION ?? '0.1',
      WITH_CREDENTIALS: config?.WITH_CREDENTIALS ?? false,
      CREDENTIALS: config?.CREDENTIALS ?? 'include',
      TOKEN: config?.TOKEN,
      USERNAME: config?.USERNAME,
      PASSWORD: config?.PASSWORD,
      HEADERS: config?.HEADERS,
      ENCODE_PATH: config?.ENCODE_PATH,
    });

    this.appointments = new AppointmentsService(this.request);
    this.auth = new AuthService(this.request);
    this.chat = new ChatService(this.request);
    this.chatEvent = new ChatEventService(this.request);
    this.preAppointments = new PreAppointmentsService(this.request);
    this.s3 = new S3Service(this.request);
    this.users = new UsersService(this.request);
  }
}
