import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface LoginState {
  username: string;
  token: string;
}

interface LoginActions {
  logout: () => void;
  login: (username: string, password: string) => void;
}

type LoginStore = LoginState & LoginActions;

const useLoginStore = create<LoginStore>()(
  immer((set) => ({
    username: localStorage.getItem("username") || "",
    token: localStorage.getItem("token") || "",
    login: (username: string, password: string) => {
      set((state) => {
        const token = btoa(`${username}:${password}`);
        localStorage.setItem("token", token);
        state.username = username;
        state.token = token;
      });
    },
    logout: () => {
      set((state) => {
        localStorage.removeItem("username");
        localStorage.removeItem("token");
        state.username = "";
        state.token = "";
      });
    }
  }))
);

export { useLoginStore };