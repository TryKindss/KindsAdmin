import apiSlice from "@/api";
import { DashboardStatsInterface, DomainStatInterface } from "@/lib/type/dashboard/stats";
import { UserData } from "@/lib/type/user";

export const m365UsersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchAllUsers: builder.query<UserData, void>({
      query: () => ({
        url: "users/organization",
        method: "GET",
      }),
    }),
    fetchDomainStat: builder.query<DomainStatInterface, void>({
      query: () => ({
        url: "microsoft/dashboard/stats",
        method: "GET",
      }),
    }),

    fetchDashboardStat: builder.query<DashboardStatsInterface, void>({
      query: () => ({
        url: "protection/dashboard/stats",
        method: "GET",
      }),
    }),
  }),
});

export const { useFetchAllUsersQuery, useFetchDashboardStatQuery,useFetchDomainStatQuery } = m365UsersApi;
