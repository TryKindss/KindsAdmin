import apiSlice from "@/api";
import { PolicyResponse } from "@/lib/type/policy";

export const policyApi = apiSlice
  .enhanceEndpoints({
    addTagTypes: ["policies"],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      fetchAllPolicy: builder.query<PolicyResponse[], { orgId: string }>({
        query: ({ orgId }) => ({
          url: `protection/system-policies/?organizationId=${orgId}`,
          method: "GET",
        }),
        providesTags: ["policies"],
      }),

      togglePolicyStatus: builder.mutation<
        PolicyResponse[],
        { policyId: string; status: boolean }
      >({
        query: ({ policyId, status }) => ({
          url: `protection/system-policies/${policyId}/status`,
          method: "PUT",
          body: {
            isEnabled: status,
          },
        }),
        invalidatesTags: ["policies"],
      }),
    }),
  });

export const { useFetchAllPolicyQuery, useTogglePolicyStatusMutation } =
  policyApi;
