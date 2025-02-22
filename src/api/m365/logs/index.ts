import apiSlice from "@/api";

interface EmailLogsResponse {
  items: EmailLogItem[];
  pagination: {
    currentPage: string;
    totalPages: number;
    totalItems: number;
    itemsPerPage: string;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
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
  search?: string;
  status?: string;
}

export const emailLogApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchEmailLogs: builder.query<EmailLogsResponse, FetchEmailLogsParams>({
      query: ({ orgId, page = 1, limit = 20,search,status }) => ({
        url: `/protection/email-logs?organizationId=${orgId}&page=${page}&limit=${limit}&status=${status}&search=${search}`,
        method: "GET",
      }),
      // async onQueryStarted(args, { queryFulfilled }) {
      //   console.log("Query started with args:", args);
      //   try {
      //     const { data } = await queryFulfilled;
      //     console.log("Query response:", data);
      //   } catch (err) {
      //     console.error("Query failed:", err);
      //   }
      // },
    }),
  }),
});

export const { useFetchEmailLogsQuery } = emailLogApi;
