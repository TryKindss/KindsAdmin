"use client";
import { useState } from "react";
import {
  ChevronDown,
  Bell,
  Search,
  ExternalLink,
  Home,
  FileText,
  Shield,
  BarChart,
  RefreshCcw,
  Database,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Logo from "./Logo";
import SelectAccount from "./account-selection";
import { Dialog } from "@/components/ui/dialog";
import Image from "next/image";
import Images from "@/utils/images";

export default function NavMenu() {
  const [open, setOpen] = useState(false);
  const toggleAccount = () => {
    setOpen(!open);
  };

  const menuItems = [
    { icon: Home, label: "Home", shortcut: "⇧K" },
    { icon: FileText, label: "Audit", shortcut: "⇧I" },
    { icon: Shield, label: "Policies", shortcut: "⇧N" },
    { icon: BarChart, label: "Reporting", shortcut: "⇧D" },
    { icon: RefreshCcw, label: "Flux", shortcut: "⇧D" },
    { icon: Database, label: "Sources", shortcut: "⇧S" },
    { icon: Settings, label: "Settings", shortcut: "⇧B" },
  ];

  return (
    <>
      <header className="flex items-center justify-between px-4 py-4  ">
        <div className="flex items-center space-x-4">
          <Logo />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-[200px] justify-between border-kindsGrey bg-white">
                <div className="flex items-center space-x-2">
                  <Image alt="" src={Images.icons.snowFlake} />
                  <span>Flux</span>
                </div>
                <ChevronDown className="w-4 h-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              {menuItems.map((item, index) => (
                <DropdownMenuItem
                  key={index}
                  className="flex justify-between items-center"
                >
                  <div className="flex items-center">
                    <item.icon className="mr-2 h-4 w-4" />
                    <span>{item.label}</span>
                  </div>
                  <span className="text-xs text-gray-500">{item.shortcut}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            variant="ghost"
            className="flex items-center space-x-1"
            onClick={toggleAccount}
          >
            Partner Client Organization
            <ExternalLink className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input className="pl-8" placeholder="Search..." />
          </div>
          <Button variant="ghost" size="icon">
            <Bell className="w-5 h-5" />
          </Button>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </header>
      <Dialog open={open} onOpenChange={toggleAccount}>
        <SelectAccount />
      </Dialog>
    </>
  );
}
