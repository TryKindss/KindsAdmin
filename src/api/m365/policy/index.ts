import apiSlice from "@/api";
import { PolicyResponse } from "@/lib/type/policy";

export const policyApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchAllPolicy: builder.query<PolicyResponse[], {orgId:string}>({
      query: ({orgId}) => ({
        url: `protection/system-policies/?organizationId=${orgId}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useFetchAllPolicyQuery } = policyApi;
