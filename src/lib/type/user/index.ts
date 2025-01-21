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
    roles: string[];
    created: string;
    status: string;
    healthScore: number;
    stats: Stats;
  }
  
  export type UserData = UserDataItem[];
  