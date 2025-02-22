import { SessionProfileResponse } from "@/store/slice/sessionProfileSlice";
import apiSlice from "..";

export const sessionProfileApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSessionProfile: builder.query<SessionProfileResponse, void>({
      query: () => ({
        url: "/auth/me",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetSessionProfileQuery } = sessionProfileApi;
