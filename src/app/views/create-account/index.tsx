"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCreateAccountContext } from "@/providers/CreateAccountContext";
import Logo from "@/app/scaffold/navigation/Logo";
import OrganizationNameCard from "./organization-name-prompt";
import EmailSecurityAudit from "./email-audit-prompt";
import InboxSyncCard from "./inbox-sync";
import SyncPreviewCard from "./sync-preview";
import LaunchPlaygroundCard from "./launch-playground";
import { RefineSync } from "./refine-sync";

export default function CreateAccountFlow() {
  const [mounted, setMounted] = useState(false);
  const {
    step,
    accountName,
    showCreateAccountModal,
    setShowCreateAccountModal,
  } = useCreateAccountContext();

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted || !showCreateAccountModal) return null;

  const handleClose = () => {
    setShowCreateAccountModal(false);
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return <OrganizationNameCard />;
      case 1:
        return <EmailSecurityAudit />;
      case 2:
        return <InboxSyncCard />;
      case 3:
        return <SyncPreviewCard />;
      case 4:
        return <LaunchPlaygroundCard />;
      default:
        return <div>Onboarding Complete!</div>;
    }
  };
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
                onClick={handleClose}
                className="rounded-xl border"
              >
                <X className="h-6 w-6" />
                <span className="sr-only">Close</span>
              </Button>
            </div>
            <div>
              <p className="font-semibold">New Organization</p>
              <p className="font-thin text-[#667085]">{accountName}</p>
            </div>
          </div>

          <div className="flex-1 w-full h-full  flex justify-center items-center">
            {renderStep()}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
