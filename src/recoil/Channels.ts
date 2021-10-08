import { selector } from "recoil";
import { Channel } from "../types/Message";

export const ChannelsSelector = selector<Channel[]>({
  key: 'ChannelsSelector',
  get: async () => {
    console.log("GET channels");

    try {
      const response = await fetch("http://localhost:8080/channels");

      return response.json();
    } catch(err) {
      console.log("Can not get channels");
    }
  }
});
