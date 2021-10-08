import { selectorFamily } from "recoil";
import { Message } from "../types/Message";
import { Messages } from "./Messages";

export const messagesPerChannel = selectorFamily<Message[], string>({
  key: "messagesPerChannel",
  get: (channelId) => ({ get }) => {
    return get(Messages).filter(message => message.channel.id === channelId);
  }
});
