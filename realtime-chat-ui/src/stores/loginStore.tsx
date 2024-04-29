import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface LoginState {
  username: string;
}

interface LoginActions {
  logout: () => void;
  login: (username: string) => void;
}

type LoginStore = LoginState & LoginActions;

const useLoginStore = create<LoginStore>()(
  immer((set) => ({
    username: localStorage.getItem("username") || "",
    login: (username: string) => {
      set((state) => {
        localStorage.setItem("username", username);
        state.username = username;
      });
    },
    logout: () => {
      set((state) => {
        localStorage.removeItem("username");
        state.username = "";
      });
    }
  }))
);

export { useLoginStore };