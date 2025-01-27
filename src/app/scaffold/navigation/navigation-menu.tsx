"use client";
import { useState } from "react";
import { ChevronDown, Bell, Search, LogOut, User, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Logo from "./Logo";
import SelectAccount from "./account-selection";
import { Dialog } from "@/components/ui/dialog";
import Image from "next/image";
import Images from "@/utils/images";
import axios from "axios";
import { signOut } from "next-auth/react";

export default function NavMenu() {
  const [open, setOpen] = useState(false);
  const toggleAccount = () => {
    setOpen(!open);
  };

  const menuItems = [
    { icon: Images.menuItems.home, label: "Home", shortcut: "⌘K" },
    { icon: Images.menuItems.note, label: "Audit", shortcut: "⌘I" },
    { icon: Images.menuItems.policies, label: "Policies", shortcut: "⌘N" },
    { icon: Images.menuItems.barChart, label: "Reporting", shortcut: "⌘D" },
    { icon: Images.menuItems.flux, label: "Flux", shortcut: "⌘D" },
    { icon: Images.menuItems.connection, label: "Connections", shortcut: "⌘S" },
    { icon: Images.menuItems.settings, label: "Settings", shortcut: "⌘B" },
  ];

  const [organization, setOrganization] = useState<null | string>(null);

  const [logoutLoading, setLogoutLoading] = useState(false);
  const handleLogout = async () => {
    setLogoutLoading(true);
    try {
      await signOut({
        callbackUrl: "/login",
      });
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      setLogoutLoading(false);
    }
  };

  return (
    <>
      <header className="flex items-center justify-between px-4 py-4  ">
        <div className="flex items-center space-x-4">
          <Logo />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="w-[200px] justify-between border-kindsGrey bg-white"
              >
                <div className="flex items-center space-x-2">
                  <Image alt="" src={Images.icons.snowFlake} />
                  <span>Flux</span>
                </div>
                <ChevronDown className="w-4 h-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 space-y-2">
              {menuItems.map((item, index) => (
                <DropdownMenuItem
                  key={index}
                  className="flex justify-between items-center"
                >
                  <div className="flex items-center">
                    {/* <item.icon className="mr-2 h-4 w-4" /> */}
                    <Image alt="" src={item.icon} className="mr-2 h-4 w-4" />
                    <span>{item.label}</span>
                  </div>
                  <span className="text-xs text-gray-500">{item.shortcut}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            variant="ghost"
            className="flex items-center space-x-2"
            onClick={toggleAccount}
          >
            <span className="font-semibold">
              {organization ? organization : "Partner Client Organization"}
            </span>
            <Image alt="" src={Images.menuItems.shuffle} className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            className="border border-kindsGrey"
          >
            <Search className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="border border-kindsGrey"
          >
            <Bell className="w-5 h-5" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage src="https://ca.slack-edge.com/T054NL1J04D-U054K0E8P5L-5f1508e726ae-48" />
                <AvatarFallback>CW</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer text-red-600"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                {logoutLoading ? (
                  <Loader2 className="anumate-spin text-black text-center" />
                ) : (
                  "Logout"
                )}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <Dialog open={open} onOpenChange={toggleAccount}>
        <SelectAccount setOrganization={setOrganization} setOpen={setOpen} />
      </Dialog>
    </>
  );
}
