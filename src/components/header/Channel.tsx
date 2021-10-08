import { useRecoilValue, useSetRecoilState } from "recoil";
import Badge from "@mui/material/Badge";
import Button from "@mui/material/Button";

import { messagesPerChannelCounter } from "../../recoil/ChannelMessageCounter";
import { CurrentChannel } from "../../recoil/CurrentChannel";
import { Channel } from "../../types/Message";

const ChannelComponent = ({ channel }: { channel: Channel }) => {
  const channelCounter = useRecoilValue(messagesPerChannelCounter(channel.id));
  const setCurrentChannel = useSetRecoilState(CurrentChannel);

  return (
    <Badge
      color="primary"
      badgeContent={channelCounter}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
    >
      <Button
        key={channel.id}
        onClick={() => setCurrentChannel(channel)}
      >{channel.name}</Button>
    </Badge>
  );
};

export default ChannelComponent;
