"use client";
interface SyncPreviewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  syncData?: SyncAccountPreview;
}

import * as React from "react";
import { HelpCircle, Loader2, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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

interface SyncItem {
  id: string;
  label: string;
  checked: boolean;
}

interface TabData {
  domains: SyncItem[];
  organizationalUnits: SyncItem[];
  groups: SyncItem[];
  activeInboxes: SyncItem[];
}

interface TabInfo {
  label: string;
  tooltip: string;
}

const tabInfo: Record<keyof TabData, TabInfo> = {
  domains: {
    label: "Domains",
    tooltip: "Select domains to include in the sync",
  },
  organizationalUnits: {
    label: "Organizational Units",
    tooltip: "Select organizational units to include in the sync",
  },
  groups: {
    label: "Groups",
    tooltip: "Select groups to include in the sync",
  },
  activeInboxes: {
    label: "Active Inboxes",
    tooltip: "Select active inboxes to include in the sync",
  },
};

function RefineSync({ open, onOpenChange, syncData }: SyncPreviewProps) {
  const [searchQuery, setSearchQuery] = React.useState("");
  console.log(syncData);

  const [data, setData] = React.useState<TabData>({
    domains: [
      { id: "1", label: "list of domains", checked: true },
      { id: "2", label: "list of domains", checked: true },
      { id: "3", label: "list of domains", checked: false },
    ],
    organizationalUnits: Array.from({ length: 8 }, (_, i) => ({
      id: i.toString(),
      label: "list of Organizational Units",
      checked: false,
    })),
    groups: Array.from({ length: 8 }, (_, i) => ({
      id: i.toString(),
      label: "list of groups",
      checked: i < 5,
    })),
    activeInboxes: Array.from({ length: 80 }, (_, i) => ({
      id: i.toString(),
      label: `user@domain.com`,
      checked: i < 72,
    })),
  });

  const toggleItem = (tab: keyof TabData, id: string) => {
    setData((prev) => ({
      ...prev,
      [tab]: prev[tab].map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      ),
    }));
  };

  const toggleAll = (tab: keyof TabData, checked: boolean) => {
    setData((prev) => ({
      ...prev,
      [tab]: prev[tab].map((item) => ({ ...item, checked })),
    }));
  };

  const getCheckedCount = (items: SyncItem[]) =>
    items.filter((item) => item.checked).length;

  const filteredData = React.useMemo(() => {
    const query = searchQuery.toLowerCase();
    return Object.entries(data).reduce(
      (acc, [key, items]) => ({
        ...acc,
        [key]: items.filter((item: any) =>
          item.label.toLowerCase().includes(query)
        ),
      }),
      {} as TabData
    );
  }, [data, searchQuery]);

  const areAllChecked = (items: SyncItem[]) =>
    items.length > 0 && items.every((item) => item.checked);

  const areSomeChecked = (items: SyncItem[]) =>
    items.some((item) => item.checked);

  return (
    <TooltipProvider>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent
          side="right"
          className="w-[90vw] max-w-[600px] sm:max-w-[800px] p-0"
        >
          <div className="flex flex-col h-full">
            <SheetHeader className="p-6 pb-2">
              <SheetTitle>Sync preview</SheetTitle>
              <p className="text-sm text-muted-foreground">
                This is a preview only, no changes have been made. Use the
                refine option to exclude any Domains, OUs, Groups, or Inboxes.
              </p>
            </SheetHeader>

            <div className="px-6 py-2">
              <Input
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="max-w-full"
              />
            </div>

            <Tabs defaultValue="domains" className="flex-1">
              <TabsList className="px-6">
                {(Object.keys(data) as Array<keyof TabData>).map((tab) => (
                  <TabsTrigger key={tab} value={tab} className="flex gap-2">
                    {tabInfo[tab].label}
                    <span className="text-muted-foreground">
                      {getCheckedCount(data[tab])}/{data[tab].length}
                    </span>
                  </TabsTrigger>
                ))}
              </TabsList>

              <ScrollArea className="flex-1">
                {(Object.keys(data) as Array<keyof TabData>).map((tab) => (
                  <TabsContent key={tab} value={tab} className="mt-0 border-t">
                    <div className="divide-y">
                      <div className="flex items-center gap-2 p-4 bg-muted/50">
                        <Checkbox
                          id={`${tab}-all`}
                          checked={areAllChecked(filteredData[tab])}
                          // @ts-ignore
                          indeterminate={
                            !areAllChecked(filteredData[tab]) &&
                            areSomeChecked(filteredData[tab])
                          }
                          onCheckedChange={(checked) =>
                            toggleAll(tab, !!checked)
                          }
                        />
                        <label
                          htmlFor={`${tab}-all`}
                          className="text-base font-medium flex items-center gap-2"
                        >
                          {tabInfo[tab].label} ({getCheckedCount(data[tab])}/
                          {data[tab].length})
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <HelpCircle className="h-4 w-4 text-muted-foreground" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{tabInfo[tab].tooltip}</p>
                            </TooltipContent>
                          </Tooltip>
                        </label>
                      </div>
                      {filteredData[tab].map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center space-x-2 py-2 px-6"
                        >
                          <Checkbox
                            id={`${tab}-${item.id}`}
                            checked={item.checked}
                            onCheckedChange={() => toggleItem(tab, item.id)}
                          />
                          <label
                            htmlFor={`${tab}-${item.id}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {item.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                ))}
              </ScrollArea>
            </Tabs>

            <div className="border-t p-6 flex justify-end gap-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Back
              </Button>
              <Button onClick={() => onOpenChange(false)}>Save</Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </TooltipProvider>
  );
}

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
      <div className="h-24 flex justify-center items-center">
        {isLoading && <Loader2 className="animate-spin text-black w-6 h-6" />}
        {!isLoading && isError && (
          <p className="text-center text-black text-sm">
            An Error occured, retry syncing
          </p>
        )}
      </div>
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
      )}

      <RefineSync open={open} onOpenChange={setOpen} syncData={syncData} />
    </Card>
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
