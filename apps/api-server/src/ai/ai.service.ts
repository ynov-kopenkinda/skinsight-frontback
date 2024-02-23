import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AiService {
  constructor(private readonly httpService: HttpService) {}

  async askMedOllama(message: string) {
    return "This is not a cancer";
  }
}
