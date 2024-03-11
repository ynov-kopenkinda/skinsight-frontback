import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AiService {
  constructor(private readonly httpService: HttpService) {}

  async askMedOllama(_message: string) {
    return `This is not a cancer ${_message}`;
  }
}
