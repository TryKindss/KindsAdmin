import apiSlice from "@/api";

interface EmailLogsResponse {
  items: EmailLogItem[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}

interface EmailLogItem {
  id: string;
  microsoftId: string;
  messageId: string;
  action: string;
  user: string;
  emailHeader: {
    subject: string;
    from: string;
  };
  totalUsers: number;
  senderScore: number;
  detections: string[];
  receivedDateTime: string;
  mailboxId: string;
  securityDetails: {
    score: number;
    factors: {
      domainReputation: number;
      contentAnalysis: number;
      recipientAnalysis: number;
      timeAnalysis: number;
      attachmentRisk: number;
    };
  };
}

interface FetchEmailLogsParams {
  orgId: string;
  page?: number;
  limit?: number;
}

export const emailLogApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchEmailLogs: builder.query<EmailLogsResponse, FetchEmailLogsParams>({
      query: ({ orgId, page = 1, limit = 20 }) => ({
        url: `/protection/email-logs?organizationId=${orgId}&page=${page}&limit=${limit}`,
        method: "GET",
      }),
      async onQueryStarted(args, { queryFulfilled }) {
        console.log('Query started with args:', args);
        try {
          const { data } = await queryFulfilled;
          console.log('Query response:', data);
        } catch (err) {
          console.error('Query failed:', err);
        }
      },
    }),
  }),
});

export const { useFetchEmailLogsQuery } = emailLogApi;
