export interface Organization {
  id: string;
  microsoftId: string;
  domain: string;
  displayName: string;
  status: string;
  ownerId: string;
  healthScore: number;
  groupsCount: number;
  usersCount: number;
  connections: string[];
  lastSyncedAt: string;
  autoSync: boolean;
}

export interface AccountsDetailInterface {
  success: boolean;
  organization: Organization;
}
