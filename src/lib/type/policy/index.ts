export interface PolicyInbox {
  inboxId: string;
  name: string;
  email: string;
  isEnabled: boolean;
}

export interface PolicyResponse {
  id: string;
  name: string;
  description: string;
  action: string;
  trigger: string;
  isEnabled: boolean;
  inboxes: PolicyInbox[];
  inboxesCount: number;
  organizationsCount: number;
}
