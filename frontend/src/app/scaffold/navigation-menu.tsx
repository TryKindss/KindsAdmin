import * as React from "react";
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
  Menu,
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
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function NavMenu() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const menuItems = [
    { icon: Home, label: "Home", shortcut: "⇧K" },
    { icon: FileText, label: "Audit", shortcut: "⇧I" },
    { icon: Shield, label: "Policies", shortcut: "⇧N" },
    { icon: BarChart, label: "Reporting", shortcut: "⇧D" },
    { icon: RefreshCcw, label: "Flux", shortcut: "⇧D" },
    { icon: Database, label: "Sources", shortcut: "⇧S" },
    { icon: Settings, label: "Settings", shortcut: "⇧B" },
  ];

  const NavContent = () => (
    <>
      <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
        <svg
          className="w-6 h-6 text-gray-600"
          fill="none"
          height="24"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
          <polyline points="14 2 14 8 20 8" />
        </svg>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center space-x-1">
              Flex
              <ChevronDown className="w-4 h-4" />
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
        <Button variant="ghost" className="flex items-center space-x-1">
          Partner Client Organization
          <ExternalLink className="w-4 h-4" />
        </Button>
      </div>
      <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
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
    </>
  );

  return (
    <header className="flex items-center justify-between px-4 py-2 bg-white border-b">
      <div className="md:hidden">
        <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            <nav className="flex flex-col space-y-4">
              <NavContent />
            </nav>
          </SheetContent>
        </Sheet>
      </div>
      <div className="hidden md:flex md:flex-1 md:items-center md:justify-between">
        <NavContent />
      </div>
    </header>
  );
}
