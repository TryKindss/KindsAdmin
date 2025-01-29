"use client";
interface SyncPreviewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  syncData: SyncAccountPreview;
}

import * as React from "react";
import { HelpCircle, Loader2, X } from "lucide-react"; 
import { Button } from "@/components/ui/button"; 
import { SyncAccountPreview } from "@/lib/type/accounts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { InfoIcon } from "lucide-react";
import { useCreateAccountContext } from "@/providers/CreateAccountContext";
import { useState } from "react";
import { useSyncPreviewQuery } from "@/api/m365/auth";
import { useAppSelector } from "@/hooks";
import { createPortal } from "react-dom";
import Logo from "@/app/scaffold/navigation/Logo";
import { useRouter } from "next/navigation";
import RefineSync from "./components/refine-sync"; 

function SyncPreviewCard() {
  const { setStep, step, setShowRefineSync } = useCreateAccountContext();
  const token = useAppSelector((store) => store.authState.token);

  const [open, setOpen] = useState(false);

  const {
    data: syncData,
    isLoading,
    isError,
  } = useSyncPreviewQuery(undefined, { skip: !token });

  console.log("SYNCDATAAAAA", syncData);

  const handleRefine = () => {
    setOpen(true);
  };

  const [syncStep, setSyncStep] = useState(0);
  const handleNext = () => {
    setSyncStep(syncStep + 1);
  };


  return (
    <>
      {/* {syncStep === 0 ? ( */}
        <Card className="w-full max-w-md border shadow-none">
          <CardHeader className="space-y-2">
            <CardTitle>Sync preview</CardTitle>
            <CardDescription>
              This is a preview only, no changes have been made. Use the refine
              option to exclude any Domains, OUs, Groups, or Inboxes.
            </CardDescription>
          </CardHeader>
          {isLoading && (
            <div className="h-24 flex justify-center items-center">
              <Loader2 className="animate-spin text-black w-6 h-6" />
            </div>
          )}
          {!isLoading && isError && (
            <div className="h-24 flex justify-center items-center">
              <p className="text-center text-black text-sm">
                An Error occured, retry syncing
              </p>
            </div>
          )}
          {!isLoading && syncData && (
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-start flex-col">
                  <div>
                    <div className="font-medium">Domains</div>
                    <div className="text-sm text-muted-foreground">
                      {syncData?.domains?.total || 0}
                    </div>
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
                      <div className="text-sm text-muted-foreground">
                        {syncData?.organizationalUnits?.total || 0}
                      </div>
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
                      <div className="text-sm text-muted-foreground">
                        {syncData?.groups?.total || 0}
                      </div>
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
                    <div className="text-sm text-muted-foreground">
                      {syncData?.activeInboxes?.total || 0}
                    </div>
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
                  <Button
                    variant="outline"
                    // onClick={() => setStep(step - 1)}
                  >
                    Back
                  </Button>
                  <Button
                    onClick={handleNext}
                    className="bg-gray-900 text-white hover:bg-gray-800"
                  >
                    Next
                  </Button>
                </div>
              </div>
            </CardContent>
          )}

          <RefineSync
            open={open}
            onOpenChange={setOpen}
            // @ts-ignore
            syncData={!isLoading && syncData}
          />
        </Card>
      {/* ) : (
        <AutoSyncPromptCard setSyncStep={setSyncStep}/>
      )} */}
    </>
  );
}

export default function EmailCallbackPage() {
  const router = useRouter();
  return createPortal(
    <div className="fixed inset-0 bg-background bg-opacity-75 z-50 ">
      <div className="max-w-[1920px]  mx-auto min-h-screen h-full p-8">
        <div className="w-full flex h-full flex-col ">
          <div>
            <div className="flex items-center justify-between">
              <Logo />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => router.push("/")}
                className="rounded-xl border"
              >
                <X className="h-6 w-6" />
                <span className="sr-only">Close</span>
              </Button>
            </div>
            <div>
              <p className="font-semibold">New Organization</p>
              <p className="font-thin text-[#667085]">Org</p>
            </div>
          </div>

          <div className="flex-1 w-full h-full  flex justify-center items-center">
            <SyncPreviewCard />
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
