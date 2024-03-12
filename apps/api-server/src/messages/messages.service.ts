import { Injectable } from "@nestjs/common";

import { CreateMessageDto } from "./dto/create-message.dto";
import { Message } from "./entities/message.entity";

@Injectable()
export class MessagesService {
  messages: Message[] = [{ name: "John", message: "Hello" }];

  identify(name: string, client: string) {
    return { name, client };
  }

  create(createMessageDto: CreateMessageDto) {
    const message = { ...createMessageDto };
    this.messages.push(message);

    return message;
  }

  findAll() {
    return this.messages;
  }
}
