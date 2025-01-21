"use client";
interface SyncPreviewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  syncData: SyncAccountPreview;
}

import * as React from "react";
import { HelpCircle } from "lucide-react";
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

export function RefineSync({ open, onOpenChange, syncData }: SyncPreviewProps) {
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
