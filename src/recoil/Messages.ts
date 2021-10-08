import { atom } from "recoil";
import { Message } from "../types/Message";

export const Messages = atom<Message[]>({
  key: 'MessagesAtom',
  default: [],
});
