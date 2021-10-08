import { selectorFamily } from "recoil";
import { messagesPerChannel } from "./MessagesPerChannel";

export const messagesPerChannelCounter = selectorFamily<number, string>({
  key: "messagesPerChannelCounter",
  get: (channelId) => ({ get }) => {
    return get(messagesPerChannel(channelId)).length;
  }
});