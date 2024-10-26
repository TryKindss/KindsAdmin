"use client";
import * as React from "react";
import { Search, ChevronUp, ChevronDown, Settings, Plus } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

const accounts = [
  { name: "General Health", users: 323, icon: "GH" },
  { name: "HealthCore Systems", users: 323, icon: "HC" },
  { name: "CanaSTEM", users: 323, icon: "CS" },
];

export default function SelectAccount() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <DialogContent
        hideClose
        className="sm:max-w-[425px] md:max-w-[700px] bg-white bg-opacity-70 p-0"
      >
        <div className="grid gap-4">
          <div className="relative ">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search accounts" className="pl-8 border-0 outline-none focus:outline-none active:outline-none focus:border-none active:border-none" />
          </div>

          <section className="p-6">
            <div>
              <h4 className="mb-4 text-sm font-medium">Recent</h4>
              <div className="space-y-4">
                {accounts.map((account) => (
                  <AccountItem key={account.name} account={account} />
                ))}
              </div>
            </div>
            <div>
              <h4 className="mb-4 text-sm font-medium">All Accounts</h4>
              <ScrollArea className="h-[200px]">
                <div className="space-y-4">
                  {accounts.map((account) => (
                    <AccountItem key={account.name} account={account} />
                  ))}
                </div>
              </ScrollArea>
            </div>
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <ChevronUp className="h-4 w-4" />
                <ChevronDown className="h-4 w-4" />
                <span>to navigate</span>
              </div>
              <div className="flex items-center space-x-4">
                <span>esc to close</span>
                <Button variant="outline" size="sm" className="h-8 px-2">
                  <Settings className="mr-2 h-4 w-4" />
                  Manage Accounts
                </Button>
                <Button variant="outline" size="sm" className="h-8 px-2">
                  <Plus className="mr-2 h-4 w-4" />
                  Create New
                </Button>
              </div>
            </div>
          </section>
        </div>
      </DialogContent>
    </>
  );
}

function AccountItem({ account }: any) {
  return (
    <div className="flex items-center space-x-4">
      <Avatar>
        <div className="bg-primary text-primary-foreground flex h-full w-full items-center justify-center text-sm font-medium">
          {account.icon}
        </div>
      </Avatar>
      <div className="space-y-1">
        <h5 className="text-sm font-medium leading-none">{account.name}</h5>
        <p className="text-sm text-muted-foreground">{account.users} Users</p>
      </div>
    </div>
  );
}
