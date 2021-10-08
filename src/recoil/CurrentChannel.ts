import { atom } from "recoil";
import { Channel } from "../types/Message";

export const CurrentChannel = atom<Channel>({
  key: 'CurrentChannel',
  default: null as unknown as Channel,
});
