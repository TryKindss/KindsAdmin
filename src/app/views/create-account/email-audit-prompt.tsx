"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useCreateAccountContext } from "@/providers/CreateAccountContext";

export default function EmailSecurityAudit() {
  const [timeRange, setTimeRange] = useState("all");

  const { step, setStep } = useCreateAccountContext();

  return (
    <Card className="w-full max-w-md shadow-none">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">
          Email Security Audit
        </CardTitle>
        <p className="text-sm text-muted-foreground mt-1">
          What time frame would you like to audit?
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Time range</p>
          <Select defaultValue={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All time (default)</SelectItem>
              <SelectItem value="1mon">1 Month</SelectItem>
              <SelectItem value="6mon">6 Months</SelectItem>
              <SelectItem value="1yr">1 year</SelectItem>
              <SelectItem value="3yr">3 years</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <p className="text-sm text-muted-foreground">
          This can be changed later.
        </p>
        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={() => setStep(0)}>
            Back
          </Button>
          <Button
            onClick={() => setStep(2)}
            className="bg-gray-900 text-white hover:bg-gray-800"
          >
            Next
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
