import { Test, TestingModule } from "@nestjs/testing";

import { ChatEventService } from "./chat-event.service";

describe("ChatEventService", () => {
  let service: ChatEventService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatEventService],
    }).compile();

    service = module.get<ChatEventService>(ChatEventService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
