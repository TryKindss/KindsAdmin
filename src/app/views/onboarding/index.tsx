import DashBoardMetric from "./metric";
import AnalyticsCards from "./analytics-card";
import DashboardHero from "./dashboard-hero";

export default function WelcomeDashboard() {
  return (
  
      <div className="space-y-12">
        <DashboardHero />
        <DashBoardMetric />
        <AnalyticsCards />
      </div>
  );
}
