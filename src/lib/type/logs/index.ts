interface EmailLogResponse {
  items: EmailItem[];
  pagination: Pagination;
}

export interface EmailItem {
  action: string;
  user: string;
  emailHeader: EmailHeader;
  totalUsers: number;
  senderScore: number;
  detections: string[];
}

export interface EmailHeader {
  subject: string;
  from: string;
}

export interface Pagination {
  total: number;
  page: number;
  limit: number;
  pages: number;
}
