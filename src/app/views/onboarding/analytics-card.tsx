"use client";

import { useFetchDashboardStatQuery } from "@/api/m365/inboxes";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppSelector } from "@/hooks";
import { ChevronLeft, ChevronRight } from "lucide-react";
import DomainChart from "./charts/domain-charts";

export default function AnalyticsCards() {
  const token = useAppSelector((store) => store.authState.token);
  const {
    data: dashboardData,
    isLoading,
    isError,
  } = useFetchDashboardStatQuery(undefined, { skip: !token });

  const cards = [
    {
      title: "Top 5% of domains",
      subtitle: `${dashboardData?.topDomains?.total || 0} unique domains`,
      items: dashboardData?.topDomains?.items || [],
    },
    {
      title: "Suspicious Domains",
      subtitle: `${
        dashboardData?.suspiciousDomains?.total || 0
      } unique domains`,
      items: dashboardData?.suspiciousDomains?.items || [],
    },
    {
      title: "Top 25% of threats",
      subtitle: `${
        dashboardData?.threats?.total || 0
      } types of threats detected`,
      items: dashboardData?.threats?.items || [],
    },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
        {cards.map((card, index) => (
          <Card key={index} className="bg-white">
            <CardHeader className="space-y-1">
              <CardTitle className="text-base font-medium">
                {card.title}
              </CardTitle>
              <p className="text-sm text-muted-foreground">{card.subtitle}</p>
            </CardHeader>
            {/* chart goes here */}
            <CardContent className="min-h-[300px] flex flex-col">
              <div className="flex items-center justify-center flex-1">
                {card?.items?.length > 0 ? (
                  <DomainChart data={card.items} />
                ) : (
                  <span className="text-sm text-muted-foreground">
                    No data available
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 pt-4 mt-auto border-t">
                <Button variant="outline" size="icon" className="h-8 w-8">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="h-8 w-8">
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <span className="text-sm text-muted-foreground">
                  Page 1 of 1
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
