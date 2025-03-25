import apiSlice from "@/api";
import { EmailLogResponse } from "@/lib/type/logs";

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

export interface EmailByIdResponse {
  id: string;
  microsoftId: string;
  messageId: string;
  action: string;
  status: string;
  subject: string;
  body: string;
  bodyPreview: string;
  from: EmailByIdSender;
  recipients: EmailByIdRecipients;
  receivedDateTime: string;
  hasAttachments: boolean;
  isRead: boolean;
  conversationId: string;
  isSentItem: boolean;
  organization: EmailByIdOrganization;
  securityDetails: EmailByIdSecurityDetails;
  mailbox: EmailByIdMailbox;
  user: EmailByIdUser;
}

export interface EmailByIdSender {
  address: string;
  name: string;
  domain: string;
}

export interface EmailByIdRecipients {
  to: string[];
  totalCount: number;
}

export interface EmailByIdOrganization {
  id: string;
  tenantId: string;
  domain: string;
  displayName: string;
}

export interface EmailByIdSecurityDetails {
  score: number;
  risk: string;
  verdict: string;
  factors: EmailByIdSecurityFactors;
  authentication: EmailByIdAuthenticationDetails;
  overallAssessment: string;
}

export interface EmailByIdSecurityFactors {
  domainReputation: EmailByIdFactorAssessment;
  contentAnalysis: EmailByIdFactorAssessment;
  recipientAnalysis: EmailByIdFactorAssessment;
  timeAnalysis: EmailByIdFactorAssessment;
  attachmentRisk: EmailByIdFactorAssessment;
}

export interface EmailByIdFactorAssessment {
  score: number;
  assessment: string;
  description: string;
}

export interface EmailByIdAuthenticationDetails {
  spf: EmailByIdAuthResult;
  dkim: EmailByIdAuthResult;
  dmarc: EmailByIdAuthResult;
  summary: string;
}

export interface EmailByIdAuthResult {
  result: string;
  description: string;
}

export interface EmailByIdMailbox {
  id: string;
  microsoftId: string;
  email: string;
}

export interface EmailByIdUser {
  id: string;
  microsoftId: string;
  mail: string;
  displayName: string;
}

interface EmailByIdParams {
  orgId: string;
}

export const emailLogApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchEmailLogs: builder.query<EmailLogResponse, FetchEmailLogsParams>({
      query: ({ orgId, page = 1, limit = 20, search, status }) => ({
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
    fetchEmailLogById: builder.query<EmailByIdResponse, EmailByIdParams>({
      query: ({ orgId }) => ({
        url: `/protection/email-logs/details/${orgId}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useFetchEmailLogsQuery, useFetchEmailLogByIdQuery } = emailLogApi;
