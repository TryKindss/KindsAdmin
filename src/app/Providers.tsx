"use client";
import { store } from "@/store";
import { PropsWithChildren, useEffect } from "react";
import { Provider } from "react-redux";
import { SessionProvider, useSession } from "next-auth/react";
import { useAppDispatch } from "@/hooks";
import { setUser } from "@/store/slice/userSlice";
import { setToken } from "@/store/slice/authSlice";
import { AccountCreateProvider } from "@/providers/CreateAccountContext";
import SplashScreen from "@/components/global/splash-screen";

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
    if (status === "authenticated" && session?.user) {
      dispatch(setUser(session?.user?.data?.user));
      dispatch(setToken(session?.user?.data?.access_token));
    }
  }, [status, data, dispatch]);
  return <>{status === "loading" ? <SplashScreen /> : children}</>;
}
