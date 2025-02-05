interface User {
  displayName: string;
  email: string;
  microsoftId: string;
  userPrincipalName: string;
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

interface UserDataItem {
  id: string;
  user: User;
  account: Account;
  groups: Group[];
  inboxType: string;
  roleRisk: string;
  created: string;
  status: string;
  stats: Stats;
}

export type UserData = UserDataItem[];
