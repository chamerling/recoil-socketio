import { useEffect, useState } from "react";
import useSocketIO from "./useSocketIO";

export type RealtimeOptions<T> = {
  // name of the event to listen to
  event: string;
  // number of elements to keep in history
  history?: number;
  // event listener triggered when event with collection name is received
  onEvent?: (data: T) => void;
};

export type CollectionService<T> = {
  options: RealtimeOptions<T>;
  events: Array<T>;
  lastEvent: T;
  send: (data: T) => void;
  emit: (event: string, data: T) => void;
};

const DEFAULT_URL = "ws://localhost:8080";

const useRealtime = <T>(options: RealtimeOptions<T>): CollectionService<T> => {
  const [url] = useState(DEFAULT_URL);
  const { io } = useSocketIO(url);
  const [lastEvent, setLastEvent] = useState<T>(null as unknown as T);
  const [events, setEvents] = useState<Array<T>>([]);

  useEffect(() => {
    io?.on(options.event, (data: T) => {
      console.debug("New ws message", data);
      setLastEvent(data);
      setEvents((events) => {
        const result = [...events, data];

        if (options.history && result.length > options.history) {
          result.splice(options.history, result.length - options.history);
        }

        return result;
      });
      options.onEvent?.(data);
    });
  }, [io, options.event]);

  return {
    options,
    events,
    lastEvent,
    // TODO: Cache when not connected
    send: (data) => io?.send(data),
    emit: (event, data) => io?.emit(event, data),
  };
};

export default useRealtime;