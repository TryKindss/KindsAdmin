import apiSlice from "@/api";
import { EmailLogResponse } from "@/lib/type/logs";
import { url } from "inspector";

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
export type SimilarEmailItem = {
  id: string;
  subject: string;
  from: SimilarEmailSender;
  recipient: SimilarEmailRecipient;
  receivedDateTime: string;
  status: string;
  action: string;
  messageType: string;
  detections: string[];
  bodyPreview: string;
  similarityReason: string;
};

export type SimilarEmailSender = {
  name: string;
  address: string;
  domain: string;
  isSimilarEmail?: boolean;
};

export type SimilarEmailRecipient = {
  email: string;
  name: string;
  userId: string;
  isSimilarEmail?: boolean;
};

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
  messageType: string;
  detections: string[];
  securityThreats: SecurityThreat[];
  senderScore: number;
  activity: EmailActivity;
  impactedOrganizations: ImpactedEntity[];
  impactedDomains: ImpactedEntity[];
  htmlBody: string;
  plainTextBody: string;
  isHtml: boolean;
  affectedUsersCount: number;
  authentication: AuthenticationDetails;
  assessment: string;
  threatAnalysis: ThreatAnalysis;
  userInfo: EmailUserInfo;
  similarEmails: SimilarEmailItem[];
  organizationDetails: OrganizationDetails;
}

interface OrganizationDetails {
  id: string;
  displayName: string;
  domain: string;
  tenantId: string;
  name: string;
}
export interface EmailByIdSender {
  name: string;
  address: string;
  domain: string;
}

export interface EmailByIdRecipients {
  to: EmailRecipient[];
  totalCount: number;
}

export interface EmailRecipient {
  address: string;
  name: string;
}

export interface EmailByIdOrganization {
  name: string;
  id: string;
}

export interface EmailByIdSecurityDetails {
  score: number;
  risk: string;
  verdict: string;
  factors: SecurityFactors;
  authentication: AuthenticationDetails;
  overallAssessment: string;
}

export interface SecurityFactors {
  domainReputation: ScoreAssessment;
  contentAnalysis: ScoreAssessment;
  recipientAnalysis: ScoreAssessment;
  timeAnalysis: ScoreAssessment;
  attachmentRisk: ScoreAssessment;
}

export interface ScoreAssessment {
  score: number;
  assessment: string;
  description: string;
}

export interface AuthenticationDetails {
  spf: AuthResult;
  dkim: AuthResult;
  dmarc: AuthResult;
  summary: string;
}

export interface AuthResult {
  result: string;
  description: string;
}

export interface SecurityThreat {
  category: string;
  severity: string;
  confidence: number;
  name: string;
  description: string;
  indicators: string[];
  mitigation: string;
}

export interface EmailActivity {
  recipientEmail: string;
  received: string;
  detected: string;
  opened: string;
  linkClicked: string;
  firstReplied: string;
  reported: string;
}

export interface ImpactedEntity {
  name: string;
  id: string;
}

export interface ThreatAnalysis {
  authenticationScore: number;
  senderScore: number;
  contentScore: number;
  behavioralScore: number;
  overallScore: number;
  malwareDetectionScore: number;
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

export interface EmailUserInfo {
  id: string;
  displayName: string;
  email: string;
  jobTitle: string;
  department: string;
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

export const emailLogApi = apiSlice
  .enhanceEndpoints({
    addTagTypes: ["email-log-details"],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      fetchEmailLogs: builder.query<EmailLogResponse, FetchEmailLogsParams>({
        query: ({ orgId, page = 1, limit = 20, search, status }) => ({
          url: `/protection/email-logs?organizationId=${orgId}&page=${page}&limit=${limit}&status=${status}&search=${search}&allOrganizations=true`,
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
          url: `/protection/email-logs/details/${orgId}?allOrganizations=true`,
          method: "GET",
        }),
      }),
      updateEmailActionStatus: builder.mutation<
        any,
        { emailId: string; action: string }
      >({
        query: ({ emailId, action }) => ({
          url: `protection/email-logs/details/${emailId}/status`,
          method: "PUT",
          body: {
            action: action,
          },
        }),
        invalidatesTags: ["email-log-details",]
      }),

      updateEmailMessageType: builder.mutation<
        any,
        { emailId: string; messageType: string }
      >({
        query: ({ emailId, messageType }) => ({
          url: `protection/email-logs/details/${emailId}/message-type`,
          method: "PUT",
          body: {
            messageType: messageType,
          },
        }),
        invalidatesTags: ["email-log-details",]
      }),

      updateEmailDetections: builder.mutation<
        any,
        { emailId: string; detections: string[] }
      >({
        query: ({ emailId, detections }) => ({
          url: `protection/email-logs/details/${emailId}/detections`,
          method: "PUT",
          body: {
            detections: detections,
            notes: ""
          },
        }),
        invalidatesTags: ["email-log-details",]
      }),
    }),
  });

export const {
  useFetchEmailLogsQuery,
  useFetchEmailLogByIdQuery,
  useUpdateEmailActionStatusMutation,
  useUpdateEmailDetectionsMutation,
  useUpdateEmailMessageTypeMutation,
} = emailLogApi;
