import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { Client, IFrame } from "@stomp/stompjs";
import { ConnectionStatus } from "@/stores/wsclient/wsclient.interface.ts";

export type WSClientState = {
  client: Client | null;
  connectionStatus: ConnectionStatus;
  subscriptions: string[];
}

export type WSClientActions = {
  connect: () => void;
  disconnect: () => void;
  setConnectionState: (state: ConnectionStatus) => void;
}

export type WSClientStore = WSClientState & WSClientActions;

export const useWSClientStore = create<WSClientStore>()(
  immer((set, get) => ({
    client: null,
    connectionStatus: ConnectionStatus.CONNECTING,
    subscriptions: [],
    connect: () => {
      set((state) => {
        if (!state.client) {
          state.client = createClient(get());
        }
        state.client.activate();
      });
    },
    disconnect: () => {
      // deactivate if exists
      set((state) => {
        if (state.client) {
          state.client.deactivate().then(r => console.log("deactivated", r));
        }
      });
    },
    setConnectionState: (connectionStatus: ConnectionStatus) => {
      set((state) => {
        state.connectionStatus = connectionStatus;
      });
    },
  }))
);

function createClient(store: WSClientStore): Client {
  store.setConnectionState(ConnectionStatus.CONNECTING);

  return new Client({
    connectHeaders: {
      "Authorization": "Basic dXNlcjI6cGFzcw=="
    },
    brokerURL: "ws://localhost:5173/ws/stomp",
    onConnect: (iframe) => {
      store.setConnectionState(ConnectionStatus.CONNECTED);
      onConnect(iframe);
    },
    onWebSocketClose: (evt) => {
      store.setConnectionState(ConnectionStatus.CLOSED);
      onWebSocketClose(evt);
    },
    onStompError: (iframe) => {
      store.setConnectionState(ConnectionStatus.FAILED);
      onStompError(iframe);
    },
  });
}

function onConnect(_iframe: IFrame) {
  console.error("CONNECTED", _iframe);
}

function onWebSocketClose(evt: CloseEvent) {
  console.error("Disconnecting", evt);
}

function onStompError(frame: IFrame) {
  console.error("error", frame);
}