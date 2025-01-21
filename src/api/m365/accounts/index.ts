import apiSlice from "@/api";
import { AccountsDetailInterface } from "@/lib/type/accounts";

export const domainStatApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchAllAccounts: builder.query<AccountsDetailInterface, void>({
      query: () => ({
        url: "email/microsoft/organization",
        method: "GET",
      }),
    }),
  }),
});

export const {useFetchAllAccountsQuery} = domainStatApi;
