import DashBoardMetric from "./metric";
import AnalyticsCards from "./analytics-card";
import DashboardHero from "./dashboard-hero";

export default function WelcomeDashboard() {
  return (
  
      <div className="space-y-6 pb-12">
        {/* <DashboardHero /> */}
        <DashBoardMetric />
        <AnalyticsCards />
      </div>
  );
}
