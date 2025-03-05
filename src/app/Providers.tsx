"use client";
import { store } from "@/store";
import { PropsWithChildren, useEffect } from "react";
import { Provider } from "react-redux";
import { SessionProvider, useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { setUser } from "@/store/slice/userSlice";
import { setToken } from "@/store/slice/authSlice";
import { AccountCreateProvider } from "@/providers/CreateAccountContext";
import SplashScreen from "@/components/global/splash-screen";
import { useGetSessionProfileQuery } from "@/api/auth/sessionProfile";
import { setSessionProfile } from "@/store/slice/sessionProfileSlice";
import { DashboardTabProvider } from "@/providers/DashboardTabContext";

export default function Providers({ children }: PropsWithChildren) {
  return (
    <Provider store={store}>
      <SessionProvider>
        <SessionToState>
          <AccountCreateProvider>
            <DashboardTabProvider>{children}</DashboardTabProvider>
          </AccountCreateProvider>
        </SessionToState>
      </SessionProvider>
    </Provider>
  );
}

function SessionToState({ children }: PropsWithChildren) {
  const { data, status } = useSession();
  const session = data as any;
  const token = useAppSelector((store) => store.authState.token);

  const { data: sessionProfile, isLoading } = useGetSessionProfileQuery(
    undefined,
    {
      skip: !token,
    }
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      dispatch(setUser(session?.user?.data?.user));
      dispatch(setToken(session?.user?.data?.access_token));
    }

    if (status === "authenticated" && session?.user && !isLoading) {
      dispatch(setSessionProfile(sessionProfile || null));
    }
  }, [status, data, dispatch]);
  return <>{status === "loading" || isLoading ? <SplashScreen /> : children}</>;
}
