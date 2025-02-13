import apiSlice from "@/api";
import {
  DashboardStatsInterface,
  DomainStatInterface,
} from "@/lib/type/dashboard/stats";

export const domainStatApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchDomainStat: builder.query<DomainStatInterface, void>({
      async queryFn(_arg, _queryApi, _extraOptions, baseQuery) {
        const MAX_RETRIES = 2;
        let retryCount = 0;

        while (retryCount < MAX_RETRIES) {
          try {
            const result = await baseQuery({
              url: "microsoft/dashboard/organization-stats",
              method: "GET",
            });

            if (result.error) {
              throw new Error('API Error');
            }

            const data = result.data as DomainStatInterface;
            
            const hasValidData = data && 
              Object.keys(data).length > 0 && 
              data.organizations?.count !== undefined;

            if (!hasValidData) {
              console.log(`Invalid or empty response on attempt ${retryCount + 1}, retrying...`);
              retryCount++;
              
              if (retryCount === MAX_RETRIES) {
                throw new Error('Max retries reached - no valid data received');
              }
              
              await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, retryCount)));
              continue;
            }

            return { data };
          } catch (error) {
            retryCount++;
            console.error(`Attempt ${retryCount} failed:`, error);
            
            if (retryCount === MAX_RETRIES) {
              return {
                error: {
                  status: 'CUSTOM_ERROR',
                  error: 'Failed to fetch data after multiple attempts'
                }
              };
            }
            
            await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, retryCount)));
          }
        }

        return {
          error: {
            status: 'CUSTOM_ERROR',
            error: 'Failed to fetch data'
          }
        };
      },
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
