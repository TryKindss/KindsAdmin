"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { InfoIcon } from "lucide-react";
import { useCreateAccountContext } from "@/providers/CreateAccountContext";
import { RefineSync } from "./refine-sync";
import { useState } from "react";
import { useSyncPreviewQuery } from "@/api/m365/auth";
import { useAppSelector } from "@/hooks";

export default function SyncPreviewCard() {
  const { setStep, step, setShowRefineSync } = useCreateAccountContext();
  const token = useAppSelector((store) => store.authState.token);

  const [open, setOpen] = useState(true);

  const {
    data: syncData,
    isLoading,
    isError,
  } = useSyncPreviewQuery(undefined, { skip: !token });

  console.log("SYNCDATAAAAA", syncData);

  const handleRefine = () => {
    setOpen(false);
  };

  return (
    <Card className="w-full max-w-md border shadow-none">
      <CardHeader className="space-y-2">
        <CardTitle>Sync preview</CardTitle>
        <CardDescription>
          This is a preview only, no changes have been made. Use the refine
          option to exclude any Domains, OUs, Groups, or Inboxes.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex justify-between items-start flex-col">
            <div>
              <div className="font-medium">Domains</div>
              <div className="text-sm text-muted-foreground">3</div>
            </div>
            <Button
              variant="link"
              className="font-semibold text-primary p-0 h-auto "
              onClick={handleRefine}
            >
              refine
            </Button>
          </div>

          <div className="flex justify-between items-start flex-col">
            <div className="flex items-center gap-2">
              <div>
                <div className="font-medium">Organizational Units</div>
                <div className="text-sm text-muted-foreground">80</div>
              </div>
              <InfoIcon className="h-4 w-4 text-muted-foreground" />
            </div>
            <Button
              variant="link"
              className="font-semibold text-primary p-0 h-auto "
              onClick={handleRefine}
            >
              refine
            </Button>
          </div>

          <div className="flex justify-between items-start flex-col">
            <div className="flex items-center gap-2">
              <div>
                <div className="font-medium">Groups</div>
                <div className="text-sm text-muted-foreground">80</div>
              </div>
              <InfoIcon className="h-4 w-4 text-muted-foreground" />
            </div>
            <Button
              variant="link"
              className="font-semibold text-primary p-0 h-auto "
              onClick={handleRefine}
            >
              refine
            </Button>
          </div>

          <div className="flex justify-between items-start flex-col">
            <div>
              <div className="font-medium">Active Inboxes</div>
              <div className="text-sm text-muted-foreground">80</div>
            </div>
            <Button
              variant="link"
              className="font-semibold text-primary p-0 h-auto "
              onClick={handleRefine}
            >
              refine
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4">
          <Button variant="outline" onClick={handleRefine}>
            Refine
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setStep(step - 1)}>
              Back
            </Button>
            <Button
              onClick={() => setStep(step + 1)}
              className="bg-gray-900 text-white hover:bg-gray-800"
            >
              Next
            </Button>
          </div>
        </div>
      </CardContent>
      
      <RefineSync open={open} onOpenChange={setOpen} syncData={syncData}/>
    </Card>
  );
}
