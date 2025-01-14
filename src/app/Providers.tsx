"use client";
import { store } from "@/store";
import { PropsWithChildren, useEffect } from "react";
import { Provider } from "react-redux";
import { SessionProvider, useSession } from "next-auth/react";
import { useAppDispatch } from "@/hooks";
import { setUser } from "@/store/slice/userSlice";
import { AccountCreateProvider } from "@/providers/CreateAccountContext";

export default function Providers({ children }: PropsWithChildren) {
  return (
    <Provider store={store}>
      <SessionProvider>
        <SessionToState>
          <AccountCreateProvider>{children}</AccountCreateProvider>
        </SessionToState>
      </SessionProvider>
    </Provider>
  );
}

function SessionToState({ children }: PropsWithChildren) {
  const { data, status } = useSession();
  const session = data as any;
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (status === "authenticated" && session?.user.user) {
      dispatch(setUser(session?.user));
    }
  }, [status, data, dispatch]);
  return children;
}
