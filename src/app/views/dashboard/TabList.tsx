import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import React, { ReactElement } from "react";

interface TabItems {
  value: string;
  label: string;
  content: ReactElement;
}

interface TabListProps {
  tabItems: TabItems[];
  active: string;
  setActive: (active: string) => void;
}

export default function TabList({ active, setActive, tabItems }: TabListProps) {
  return (
    <div>
      <div className="">
        <Tabs value={active} onValueChange={setActive}>
          <div className="border-b border-kindsGrey py-2 mb-4">
            <TabsList className="bg-transparent">
              {tabItems.map((tab, index) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className={`shadow-none drop-shadow-none bg-white flex h-10 flex-1 cursor-pointer items-center justify-center border-b-2 px-3 pb-3 pt-2 text-sm rounded-none bg-transparent font-semibold ${
                    active === tab.value
                      ? "border-primary text-primary bg-primary shadow-none drop-shadow-none"
                      : "border-transparent text-muted-foreground"
                  } hover:text-primary data-[state=active]:border-primary data-[state=active]:text-primary`}
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {tabItems.map((tab) => (
            <TabsContent key={tab.value} value={tab.value}>
              {tab.content}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
