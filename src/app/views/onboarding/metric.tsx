"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Building2,
  Globe,
  Inbox,
  MessageSquare,
  AlertTriangle,
} from "lucide-react";

const timeRanges = ["All time", "Last 24h", "Last 7d", "Last 30d", "Last 90d"];

const metrics = [
  {
    icon: Building2,
    label: "Organizations",
    value: 0,
    change: 0,
  },
  {
    icon: Globe,
    label: "Domains",
    value: 0,
    change: 0,
  },
  {
    icon: Inbox,
    label: "Inboxes",
    value: 0,
    change: 0,
  },
  {
    icon: MessageSquare,
    label: "Messages",
    value: 0,
    change: 0,
  },
  {
    icon: AlertTriangle,
    label: "Malicious messages",
    value: 0,
    change: 0,
  },
];

interface MetricProps {
  icon: React.ElementType;
  label: string;
  value: number;
  change: number;
}

const Metric = ({ icon: Icon, label, value, change }: MetricProps) => (
  <div className="flex flex-col items-start p-6 ">
    <div className="flex items-center gap-2">
      <Icon className="w-6 h-6 mb-2" />
      <span className="font-bold text-black">{label}</span>
    </div>
    <div className="flex items-center gap-2 mb-1">
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
    </div>
  </div>
);

export default function DashBoardMetric() {
  const [timeRange, setTimeRange] = useState("All time");

  return (
    <>
      <div className="flex justify-end px-6 py-3  mt-12">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">Filter</span>
          <Select value={timeRange} onValueChange={setTimeRange}>
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
            />
          ))}
        </div>
      </div>
    </>
  );
}
