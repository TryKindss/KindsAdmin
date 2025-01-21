interface Metric {
  count: number;
  percentageChange: number;
}

export interface DomainStatInterface {
  organizations: Metric;
  domains: Metric;
  inboxes: Metric;
  messages: Metric;
  maliciousMessages: Metric;
}

interface DashboardStatsItem {
  total: number;
  items: any[];
}

export interface DashboardStatsInterface {
  topDomains: DashboardStatsItem;
  suspiciousDomains: DashboardStatsItem;
  threats: DashboardStatsItem;
}
