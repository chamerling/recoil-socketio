import { Channel as ChannelType } from "../types/Message";
import Messages from "./Messages";

const Channel = ({ channel}: { channel: ChannelType }) => {
  return (
    <Messages channel={channel} />
  );
};

export default Channel;