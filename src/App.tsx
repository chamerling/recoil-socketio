import { Suspense } from 'react';
import { useRecoilCallback, useRecoilValue, useSetRecoilState } from 'recoil';

import Channel from './components/Channel';
import Header from './components/header/Header';
import { Message, UserStatus } from './types/Message';
import { CurrentChannel } from './recoil/CurrentChannel';
import { Messages as MessagesAtom } from './recoil/Messages';
import { UserStatusSelectorFamily } from './recoil/UserStatus';
import useRealtime from './hooks/useRealtime';

import './App.css';

const App = () => {
  const setMessages = useSetRecoilState(MessagesAtom);
  const currentChannel = useRecoilValue(CurrentChannel);

  const updateStatus = useRecoilCallback(({ set }) => (status: { id: string, connected: boolean }) => {
    set(UserStatusSelectorFamily(status.id), status.connected);
  }, []);

  const updateMessages = useRecoilCallback(() => (message: Message) => {
    if (message.type === "created") {
      setMessages(m => [...m, ...[message]])
    } else if (message.type === "updated") {
      setMessages(messages => {
        const index = messages.findIndex(m => m.id === message.id);
        return index !== -1 ?
          [...messages.slice(0, index), message, ...messages.slice(index + 1)]
          :
          messages;
      });
    }
  }, [setMessages]);

  const realtimeMessages = useRealtime<Message>(
    {
      event: "message",
      onEvent: updateMessages,
    },
  );

  const realtimeStatus = useRealtime<UserStatus>(
    {
      event: "status-update",
      onEvent: updateStatus,
      history: 10,
    },
  );

  return (
    <>
      <Suspense fallback={<></>}>
        <div className="channel_header">
          <Header/>
        </div>
        <div>
          { realtimeMessages.events.length } { realtimeMessages.lastEvent?.content }
        </div>
        <div>
          { realtimeStatus.events.length } Last status update: { realtimeStatus.lastEvent?.id }
        </div>
        <div>
          {
            currentChannel ? <Channel channel={currentChannel}/> : <span>Select a channel</span>
          }
        </div>
      </Suspense>
    </>
  );
}

export default App;
