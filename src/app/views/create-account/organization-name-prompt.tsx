"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { useCreateAccountContext } from "@/providers/CreateAccountContext";

export default function OrganizationNameCard() {
  const { accountName, setAccountName, setStep } = useCreateAccountContext();

  const handleSubmit = (e: React.FormEvent) => {
    setStep(1);
  };

  return (
    <Card className="w-full max-w-md shadow-none">
      <CardHeader>
        <CardTitle>New organization</CardTitle>
        <CardDescription>
          First, create a name for the organization you are going to manage with
          Kinds.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            placeholder="Organization Name"
            value={accountName}
            onChange={(e) => setAccountName(e.target.value)}
            className="shadow-none"
          />
          <div className="flex justify-end">
            <Button
              type="submit"
              variant="default"
              disabled={accountName.length < 1}
            >
              Next
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
