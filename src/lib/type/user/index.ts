interface User {
  displayName: string;
  email: string;
  microsoftId: string;
  userPrincipalName?: string; // optional if it's no longer consistently present
}

interface Account {
  name: string;
  id: string;
  domain: string;
}

interface Group {
  id: string;
  name: string;
  role: string;
}

interface Stats {
  totalEmails: number;
  unreadEmails: number;
  attachments: number;
}

export interface UserDataItem {
  id: string;
  user: User;
  account: Account;
  groups: Group[]; // still present even if always empty
  inboxType: string;
  roleRisk: string;
  created: string;
  status: string;
  stats: Stats | null; // now nullable
}

export interface Pagination {
  currentPage: string;
  totalPages: number;
  totalItems: number;
  itemsPerPage: string;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface UserDataResponse {
  items: UserDataItem[];
  pagination: Pagination;
}
