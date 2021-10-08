import { useEffect, useRef, useState } from "react";
import { Socket, io } from "socket.io-client";

const useSocketIO = (url: string) => {
  const ioRef = useRef<Socket>();
  // having this will allow consumers to be updated with the io instance once connected
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    ioRef.current = io(url);
    ioRef.current.on("connect", () => {
      console.log("WS Connected to", url);
      setConnected(() => true);
    });

    ioRef.current.on("disconnect", () => {
      console.log("WS disconnected");
      setConnected(() => false);
    });

    return () => {
      console.log("WS destroyed");
      ioRef.current?.close();
    }

  }, [url]);

  return {
    io: ioRef.current,
    connected
  };
};

export default useSocketIO;
