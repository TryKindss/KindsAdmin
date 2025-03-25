export interface EmailLogResponse {
  items: EmailItem[];
  pagination: Pagination;
}

export interface EmailItem {
  id: string;
  microsoftId: string;
  subject: string;
  from: EmailFrom;
  to: string[]; // Assuming 'to' is an array of strings
  receivedDateTime: string; // ISO 8601 date string
  hasAttachments: boolean;
  status: string;
  action: string;
  senderScore: number;
  detections: string[];
}

export interface EmailFrom {
  name: string;
  address: string;
  domain: string;
}

export interface EmailHeader {
  subject: string;
  from: string;
}
export interface Pagination {
  currentPage: string;
  totalPages: number;
  totalItems: number;
  itemsPerPage: string;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}
