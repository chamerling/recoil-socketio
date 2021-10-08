import { useRecoilValue } from "recoil";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";

import { messagesPerChannel } from "../recoil/MessagesPerChannel";
import { Channel } from "../types/Message";
import UserAvatar from "./UserAvatar";

const Messages = ({ channel }: { channel: Channel }) => {
  const messages = useRecoilValue(messagesPerChannel(channel.id));

  return (
    <div className="messages">
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        { messages.map((message, index) => {
          return (
            <ListItem alignItems="flex-start" key={index}>
              <ListItemAvatar>
                <UserAvatar user={message.creator}/>
              </ListItemAvatar>
              <ListItemText
                primary={<span>{message.creator.name}</span>}
                secondary={<span>{message.content}</span>}
              />
            </ListItem>
          );
        })
      }
      </List>
    </div>
  );
};

export default Messages;