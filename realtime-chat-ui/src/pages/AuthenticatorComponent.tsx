import { useLoginStore } from "@/stores/loginStore.ts";
import React from "react";
import { Navigate } from "react-router-dom";

export function AuthenticatorComponent({ children }: React.PropsWithChildren<{}>) {
  const { username } = useLoginStore();

  const isLoggedIn = username !== "";

  return isLoggedIn ? children : <Navigate to={"/auth/login"} />;
}
