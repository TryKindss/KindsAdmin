"use client";
import * as React from "react";
import {
  Search,
  ChevronUp,
  ChevronDown,
  Settings,
  Plus,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import Images from "@/utils/images";
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { useCreateAccountContext } from "@/providers/CreateAccountContext";
import CreateAccountFlow from "@/app/views/create-account";

interface SelectAccountProps {
  setOrganization: (org: string) => void;
  setOpen: (value: boolean) => void;
}

export default function SelectAccount({
  setOrganization,
  setOpen,
}: SelectAccountProps) {
  const accounts = [
    {
      name: "General Health",
      users: 323,
      icon: Images.companyIcon.comapany1,
    },
    {
      name: "HealthCore Systems",
      users: 323,
      icon: Images.companyIcon.comapany2,
    },
    {
      name: "CanaSTEM",
      users: 323,
      icon: Images.companyIcon.comapany3,
    },
  ];

  const handleSelect = (org: string) => {
    setOpen(false);
    setOrganization(org);
  };
  const { setShowCreateAccountModal, showCreateAccountModal } =
    useCreateAccountContext();

  React.useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
      const isAltPressed = isMac ? event.ctrlKey : event.altKey;
      if (isAltPressed && event.key.toLowerCase() === "n") {
        setOpen(false);
        setShowCreateAccountModal(true);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [setOpen, setShowCreateAccountModal]);

  return (
    <>
      <DialogContent
        hideClose
        className="sm:max-w-[425px] md:max-w-2xl bg-white/90 p-0"
      >
        <div className="grid gap-4">
          <div className="relative border-b-2 border-kindsGrey flex items-center gap-0 pt-2 px-6">
            <Search className=" h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search accounts"
              className="border-0 outline-none focus:outline-none active:outline-none focus:border-none active:border-none rounded-none focus-visible:ring-0"
            />
          </div>

          <ScrollArea className="max-h-[480px]">
            <div>
              <h4 className="mb-4 text-sm font-medium px-4">Recent</h4>
              <div className="">
                {accounts.map((account) => (
                  <AccountItem
                    key={account.name}
                    account={account}
                    handleSelect={handleSelect}
                  />
                ))}
              </div>
            </div>
            <div>
              <h4 className="mb-4 text-sm font-medium px-4">All Accounts</h4>
              <div className="">
                {accounts.map((account) => (
                  <AccountItem
                    key={account.name}
                    account={account}
                    handleSelect={handleSelect}
                  />
                ))}
              </div>
            </div>
          </ScrollArea>
          <div className="flex items-center justify-between text-sm text-muted-foreground py-4 border-t-2 border-kindsGrey px-4">
            <div className="flex items-center space-x-2">
              <div className="bg-white rounded-lg p-2">
                <ArrowUp className="h-4 w-4" />
              </div>
              <div className="bg-white rounded-lg p-2">
                <ArrowDown className="h-4 w-4" />
              </div>
              <span className="font-semibold">to navigate</span>
              <div className="bg-white rounded-lg p-2">esc</div>
              <span className="font-semibold">to close</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant={"ghost"} className="flex items-center">
                <Settings className="mr-2 h-6 w-6" />
                <span className="font-semibold">Manage Accounts</span>
              </Button>
              <Button
                variant={"ghost"}
                className="flex items-center"
                onClick={() => {
                  setOpen(false);
                  setShowCreateAccountModal(true);
                }}
              >
                <Plus className="mr-2 h-6 w-6" />
                <span className="font-semibold">Create New</span>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
      <CreateAccountFlow />
    </>
  );
}

interface AccountItemProps {
  name: string;
  users: number;
  icon: string | StaticImport;
}

interface Account {
  account: AccountItemProps;
  handleSelect: (org: string) => void;
}

function AccountItem({ account, handleSelect }: Account) {
  return (
    <div
      className="flex items-center space-x-4 hover:cursor-pointer hover:bg-kindsGrey px-6 py-3"
      onClick={() => handleSelect(account.name)}
    >
      <Avatar>
        <div className="bg-primary text-primary-foreground flex h-full w-full items-center justify-center text-sm font-medium bg-white">
          <Image src={account.icon} alt="" className="w-8 h-8" />
        </div>
      </Avatar>
      <div className="space-y-1">
        <h5 className="text-sm font-medium leading-none">{account.name}</h5>
        <p className="text-sm text-muted-foreground">{account.users} Users</p>
      </div>
    </div>
  );
}
