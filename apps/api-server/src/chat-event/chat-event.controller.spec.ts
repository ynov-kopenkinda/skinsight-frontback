import { Test, TestingModule } from "@nestjs/testing";

import { ChatEventController } from "./chat-event.controller";

describe("ChatEventController", () => {
  let controller: ChatEventController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChatEventController],
    }).compile();

    controller = module.get<ChatEventController>(ChatEventController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
