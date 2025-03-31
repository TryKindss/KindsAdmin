import apiSlice from "@/api";
import { AccountsDetailInterface } from "@/lib/type/accounts";

export const domainStatApi = apiSlice
  .enhanceEndpoints({
    addTagTypes: ["accounts"],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      fetchAllAccounts: builder.query<AccountsDetailInterface, void>({
        async queryFn(_arg, _queryApi, _extraOptions, baseQuery) {
          const MAX_RETRIES = 2;
          let retryCount = 0;

          while (retryCount < MAX_RETRIES) {
            try {
              const result = await baseQuery({
                url: "email/microsoft/organization?allOrganizations=true",
                method: "GET",
              });

              if (result.error) {
                throw new Error("API Error");
              }

              const data = result.data as AccountsDetailInterface;

              const hasValidData =
                data &&
                Object.keys(data).length > 0 &&
                (Array.isArray(data.organizations) || (data as any).message);

              if (!hasValidData) {
                // console.log(
                //   `Invalid or empty response on attempt ${
                //     retryCount + 1
                //   }, retrying...`
                // );
                retryCount++;

                if (retryCount === MAX_RETRIES) {
                  throw new Error(
                    "Max retries reached - no valid data received"
                  );
                }

                await new Promise((resolve) =>
                  setTimeout(resolve, 1000 * Math.pow(2, retryCount))
                );
                continue;
              }

              return { data };
            } catch (error) {
              retryCount++;
              console.error(`Attempt ${retryCount} failed:`, error);

              if (retryCount === MAX_RETRIES) {
                return {
                  error: {
                    status: "CUSTOM_ERROR",
                    error: "Failed to fetch data after multiple attempts",
                  },
                };
              }

              await new Promise((resolve) =>
                setTimeout(resolve, 1000 * Math.pow(2, retryCount))
              );
            }
          }

          return {
            error: {
              status: "CUSTOM_ERROR",
              error: "Failed to fetch data",
            },
          };
        },
        providesTags: ["accounts"]
      }),
      toggleAccountAutoSync: builder.mutation<
        any,
        { orgId: string; enabled: boolean }
      >({
        query: ({ enabled, orgId }) => ({
          url: `email/microsoft/organization/${orgId}/auto-sync?allOrganizations=true`,
          method: "PATCH",
          body: {
            enabled,
          },
        }),
        invalidatesTags: ["accounts"],
      }),
    }),
  });

export const { useFetchAllAccountsQuery, useToggleAccountAutoSyncMutation } = domainStatApi;
