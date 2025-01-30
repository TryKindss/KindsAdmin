import apiSlice from "@/api";
import { RefineSyncPayload, SyncAccountPreview } from "@/lib/type/accounts";
// import headerApiSlice from "./headerApiSlice";

export const domainStatApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    connectMsAccount: builder.query<{ url: string }, void>({
      query: () => ({
        url: "email/auth/microsoft/login",
        method: "GET",
      }),
    }),
    syncPreview: builder.query<SyncAccountPreview, void>({
      query: () => ({
        url: "email/microsoft/sync/preview",
        method: "GET",
      }),
    }),
    refineSync: builder.mutation<any, RefineSyncPayload>({
      query: (payload) => ({
        url: "/email/microsoft/sync/refine",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const {
  useLazyConnectMsAccountQuery,
  useSyncPreviewQuery,
  useRefineSyncMutation,
} = domainStatApi;
