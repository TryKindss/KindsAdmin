import apiSlice from "@/api";
import {
  DashboardStatsInterface,
  DomainStatInterface,
} from "@/lib/type/dashboard/stats";
import { UserDataResponse } from "@/lib/type/user";

interface FetchInboxesParams {
  // orgId: string;
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
}

export const m365UsersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchAllUsers: builder.query<UserDataResponse, FetchInboxesParams>({
      query: ({ page = 1, limit = 20, }) => ({
        url: `users/organization?&page=${page}&limit=${limit}&allOrganizations=true`,
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

export const {
  useFetchAllUsersQuery,
  useFetchDashboardStatQuery,
  useFetchDomainStatQuery,
} = m365UsersApi;
