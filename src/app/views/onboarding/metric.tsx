"use client";

import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Images from "@/utils/images";
import Image from "next/image";
import { useFetchDomainStatQuery } from "@/api/dashboard/stats";
import { useAppSelector } from "@/hooks";
import DashboardHero from "./dashboard-hero";
import { useSession } from "next-auth/react";
import { Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const timeRanges = ["All time", "Last 24h", "Last 7d", "Last 30d", "Last 90d"];

interface MetricProps {
  icon: string;
  label: string;
  value: number;
  change: number;
  isLoading?: boolean;
}

interface Filter {
  id: string;
  label: string;
  type: "time" | "other";
  value: string;
}

const Metric = ({ icon, label, value, change, isLoading }: MetricProps) => (
  <div className="flex flex-col items-start p-6 ">
    <div className="flex items-center gap-2">
      <Image alt="" src={icon} className="w-6 h-6 mb-2" />
      <span className="font-bold text-black">{label}</span>
    </div>
    <div className="flex items-center gap-2 mb-1">
      {isLoading ? (
        <Loader2 className="animate-spin text-black h-8 w-8" />
      ) : (
        <>
          <span className="text-4xl font-semibold">{value}</span>
          <div className="flex items-center text-xs text-muted-foreground">
            <svg
              className="w-3 h-3"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 9.5V2.5M6 2.5L2.5 6M6 2.5L9.5 6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {change}%
          </div>
        </>
      )}
    </div>
  </div>
);

export default function DashBoardMetric() {
  const token = useAppSelector((store) => store.authState.token);

  const { data } = useSession();

  const user = (data as any)?.user.data.user;
  const [timeRange, setTimeRange] = useState("All time");
  const [retryTrigger, setRetryTrigger] = useState(0);
  const [retryCount, setRetryCount] = useState(0);
  const MAX_RETRIES = 2;

  const {
    data: metricData,
    isLoading,
    isError,
    refetch,
  } = useFetchDomainStatQuery(undefined, {
    skip: !token,
    refetchOnMountOrArgChange: retryTrigger,
  });

  useEffect(() => {
    const shouldRetry =
      !isError &&
      metricData &&
      !metricData.organizations?.count &&
      !metricData.domains?.count &&
      !metricData.inboxes?.count &&
      !metricData.messages?.count &&
      !metricData.maliciousMessages?.count;

    if (shouldRetry && retryCount < MAX_RETRIES) {
      const retryTimeout = setTimeout(() => {
        console.log(
          `Retrying fetch (attempt ${retryCount + 1} of ${MAX_RETRIES})...`
        );
        setRetryCount((prev) => prev + 1);
        setRetryTrigger((prev) => prev + 1);
      }, 2000 * (retryCount + 1));

      return () => clearTimeout(retryTimeout);
    } else if (retryCount >= MAX_RETRIES) {
      console.log("Max retries reached, giving up...");
    }
  }, [metricData, isError, retryCount, refetch]);

  const metrics = [
    {
      icon: Images.dashboard.metric.organizationIcon,
      label: "Organizations",
      value: metricData?.organizations?.count || 0,
      change: metricData?.organizations?.percentageChange || 0,
    },
    {
      icon: Images.dashboard.metric.domainIcon,
      label: "Domains",
      value: metricData?.domains?.count || 0,
      change: metricData?.domains?.percentageChange || 0,
    },
    {
      icon: Images.dashboard.metric.inboxesIcon,
      label: "Inboxes",
      value: metricData?.inboxes?.count || 0,
      change: metricData?.inboxes?.percentageChange || 0,
    },
    {
      icon: Images.dashboard.metric.messagesIcon,
      label: "Messages",
      value: metricData?.messages?.count || 0,
      change: metricData?.messages?.percentageChange || 0,
    },
    {
      icon: Images.dashboard.metric.maliciousIcon,
      label: "Malicious messages",
      value: metricData?.maliciousMessages?.count || 0,
      change: metricData?.maliciousMessages?.percentageChange || 0,
    },
  ];

  // filter param and handle below ----------
  const [appliedFilters, setAppliedFilters] = useState<Filter[]>([]);
  const [timeFilter, setTimeFilter] = useState("All time");

  const handleAddTimeFilter = (value: string) => {
    const newFilter: Filter = {
      id: `time-${value}`,
      label: value,
      type: "time",
      value,
    };

    // Remove any existing time filters here ------
    const filteredFilters = appliedFilters.filter(
      (filter) => filter.type !== "time"
    );
    setAppliedFilters([...filteredFilters, newFilter]);
    setTimeFilter(value);
  };

  const handleRemoveFilter = (filterId: string) => {
    const filter = appliedFilters.find((f) => f.id === filterId);
    if (filter?.type === "time") {
      setTimeFilter("All time");
    }
    setAppliedFilters(
      appliedFilters.filter((filter) => filter.id !== filterId)
    );
  };

  return (
    <>
      {user?.hasMicrosoftSync === false && <DashboardHero />}
      <div className="flex items-center justify-between border-b p-4">
        <div className="flex flex-wrap gap-2">
          {appliedFilters.map((filter) => (
            <Badge key={filter.id} variant="secondary" className="gap-1 px-3">
              {filter.label}
              <button
                onClick={() => handleRemoveFilter(filter.id)}
                className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                <X className="h-3 w-3" />
                <span className="sr-only">Remove {filter.label} filter</span>
              </button>
            </Badge>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="text-xs font-normal">
            Filter
          </Button>
          <Select value={timeFilter} onValueChange={handleAddTimeFilter}>
            <SelectTrigger className="w-[120px] h-8">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              {timeRanges.map((range) => (
                <SelectItem key={range} value={range}>
                  {range}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="w-full bg-white rounded-md border-2 ">
        <div className="grid grid-cols-5 divide-x">
          {metrics.map((metric, index) => (
            <Metric
              key={index}
              icon={metric.icon}
              label={metric.label}
              value={metric.value}
              change={metric.change}
              isLoading={isLoading}
            />
          ))}
        </div>
      </div>
    </>
  );
}
