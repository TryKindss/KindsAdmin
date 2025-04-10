import apiSlice from "@/api";
import { DashboardStatsInterface, DomainStatInterface } from "@/lib/type/dashboard/stats";
import { UserDataResponse } from "@/lib/type/user";

export const m365UsersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchAllUsers: builder.query<UserDataResponse, void>({
      query: () => ({
        url: "users/organization?allOrganizations=true",
        method: "GET",
      }),
    }),
    fetchDomainStat: builder.query<DomainStatInterface, void>({
      query: () => ({
        url: "microsoft/dashboard/stats?allOrganizations=true",
        method: "GET",
      }),
    }),

    fetchDashboardStat: builder.query<DashboardStatsInterface, void>({
      query: () => ({
        url: "protection/dashboard/stats?allOrganizations=true",
        method: "GET",
      }),
    }),
  }),
});

export const { useFetchAllUsersQuery, useFetchDashboardStatQuery,useFetchDomainStatQuery } = m365UsersApi;
