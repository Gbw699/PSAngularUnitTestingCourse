import { MessageService } from './message.service';

describe("MessageService", () => {
  let service: MessageService;

  it("Should have no messages to start", () => {
    service = new MessageService();

    expect(service.messages.length).toEqual(0);
  });

  it("Add method should add 1 message", () => {
    service = new MessageService();

    service.add("message1")

    expect(service.messages.length).toEqual(1);
  });

  it("Clean method should remove all messages", () => {
    service = new MessageService();
    service.add("message1")
    service.add("message2")

    service.clear()

    expect(service.messages.length).toEqual(0);
  });
});
