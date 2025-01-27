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
  organizations: Organization[];
}

export interface DomainItem {
  id: string;
  selected: boolean;
}

export interface OrganizationalUnit {
  total: number;
  items: any[];
}

export interface GroupItem {
  id: string;
  name: string;
  email: string;
  selected: boolean;
}

export interface ActiveInboxItem {
  id: string;
  name: string;
  email: string;
  selected: boolean;
}

export interface Domains {
  total: number;
  items: DomainItem[];
}

export interface Groups {
  total: number;
  items: GroupItem[];
}

export interface ActiveInboxes {
  total: number;
  items: ActiveInboxItem[];
}

export interface SyncAccountPreview {
  domains: Domains;
  organizationalUnits: OrganizationalUnit;
  groups: Groups;
  activeInboxes: ActiveInboxes;
}

export interface RefineSyncPayload {
  groups: string[];
  inboxes: string[];
}
