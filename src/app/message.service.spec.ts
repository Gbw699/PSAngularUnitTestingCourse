import { MessageService } from './message.service';

describe("MessageService", () => {
  let service: MessageService;

  it("should have no messages to start", () => {
    service = new MessageService();

    expect(service.messages.length).toEqual(0);
  });

  it("add method should add 1 message", () => {
    service = new MessageService();

    service.add("message1")

    expect(service.messages.length).toEqual(1);
  });

  it("clean method should remove all messages", () => {
    service = new MessageService();
    service.add("message1")
    service.add("message2")

    service.clear()

    expect(service.messages.length).toEqual(0);
  });
});
