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




interface DomainItem {
  id: string;
  selected: boolean;
}

interface OrganizationalUnit {
  total: number;
  items: any[]; 
}

interface GroupItem {
  id: string;
  name: string;
  email: string;
  selected: boolean;
}

interface ActiveInboxItem {
  id: string;
  name: string;
  email: string;
  selected: boolean;
}

interface Domains {
  total: number;
  items: DomainItem[];
}

interface Groups {
  total: number;
  items: GroupItem[];
}

interface ActiveInboxes {
  total: number;
  items: ActiveInboxItem[];
}

export interface SyncAccountPreview {
  domains: Domains;
  organizationalUnits: OrganizationalUnit;
  groups: Groups;
  activeInboxes: ActiveInboxes;
}
