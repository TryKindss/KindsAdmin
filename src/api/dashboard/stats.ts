import apiSlice from "@/api";
import {
  DashboardStatsInterface,
  DomainStatInterface,
} from "@/lib/type/dashboard/stats";

export const domainStatApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchDomainStat: builder.query<DomainStatInterface, void>({
      query: () => ({
        url: "microsoft/dashboard/organization-stats",
        method: "GET",
      }),
    }),

    fetchDashboardStat: builder.query<DashboardStatsInterface, void>({
      query: () => ({
        url: "protection/dashboard/security-stats",
        method: "GET",
      }),
    }),
  }),
});

export const { useFetchDomainStatQuery, useFetchDashboardStatQuery } =
  domainStatApi;
