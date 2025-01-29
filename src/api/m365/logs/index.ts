import apiSlice from "@/api";

export const emailLogApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchEmailLogs: builder.query<any, { orgId: string }>({
      query: ({ orgId }) => ({
        url: `/protection/email-logs?organizationId=${orgId}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useFetchEmailLogsQuery } = emailLogApi;
