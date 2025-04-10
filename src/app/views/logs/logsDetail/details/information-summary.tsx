"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";
import { ConfirmationModal } from "@/components/global/confirmation-modal";
import { EmailByIdResponse } from "@/api/m365/logs";
import { formatDate } from "@/lib/utils";

type EmailSummary = {
  senderEmail: string;
  recipientEmail: string;
  partnerName: string;
  quarantinedThreads: number;
  timestamp: string;
  messageStatus: "Quarantined" | "Approved" | "Rejected";
  messageType: "Malicious" | "Spam" | "Phishing" | "Suspicious";
  detections: string[];
  senderScore: number;
  activity: {
    received: string;
    detected: string;
    opened: string;
    linkClicked: string;
    firstReplied: string | null;
    reported: string | null;
  };
  impactedOrganizations: string[];
  impactedDomains: string[];
  organizationManager: string;
};

interface EmailSummaryParam {
  emailSummary: EmailByIdResponse;
}

export default function EmailSummary({ emailSummary }: EmailSummaryParam) {
  const [showDestructiveModal, setShowDestructiveModal] = useState(false);

  const handleConfirm = () => {
    console.log("Action confirmed!");
    // Perform your action here
  };

  const notification = {
    senderEmail: "user@domain.com",
    recipientEmail: "email@domain.com",
    partnerName: "<partner name>",
    quarantinedThreads: 12,
    timestamp: "2:36:00pm IST",
    messageStatus: "Quarantined" as const,
    messageType: "Malicious" as const,
    detections: [
      "Reported by user",
      "Impersonation",
      "Suspicious Sender",
      "Failed DKIM",
      "Failed DMARC",
      "Failed SPF",
    ],
    senderScore: 60,
    activity: {
      received: "11:23:33 AM IST",
      detected: "11:23:33 AM IST",
      opened: "11:23:33 AM IST",
      linkClicked: "11:23:33 AM IST",
      firstReplied: null,
      reported: null,
    },
    impactedOrganizations: [
      "Amazon NE",
      "Bodega",
      "Skittles Co.",
      "Pizza Hut",
      "Google",
      "Gary's Dental",
      "Obsidion",
      "Markertets Hub",
      "Dr. Mercado Offices",
      "Dental Superior",
      "Health Club",
      "Super Dental",
      "and 3 others",
    ],
    impactedDomains: [
      "Amazon.com",
      "Bodega.com",
      "Skittles.com",
      "PizzaHut.com",
      "Google.com",
      "GaryDental.com",
      "Obsidion.com",
      "MarkertersHub.com",
      "DoctorMercado.com",
      "and 12 others",
    ],
    organizationManager: "user@domain.com",
  };

  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({
    organizations: false,
    domains: false,
    orgDetails: false,
  });

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleApprove = () => {
    // Handle approve action
    console.log("Email approved");
  };

  const handleReject = () => {
    // Handle reject action
    setShowDestructiveModal(true);
    console.log("Email rejected");
  };

  return (
    <>
      <div className=" max-w-3xl mx-auto ">
        {/* Activity */}
        <div className="mb-6">
          <h3 className="text-sm font-medium mb-2">Activity</h3>
          <div className="grid grid-cols-2  gap-4">
            <div>
              <div className="flex items-center mb-1">
                <span className="text-xs font-semibold text-[#344054] mr-1">
                  Recipient email
                </span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-4 w-4 text-[#98A2B3] font-bold" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Email address of the recipient</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="text-sm">{notification.recipientEmail}</div>
            </div>

            <div>
              <div className="flex items-center mb-1">
                <span className="text-xs font-semibold text-[#344054] mr-1">
                  Delivered
                </span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-4 w-4 text-[#98A2B3] font-bold" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Time when the email was Delivered</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="text-sm">{notification.activity.received}</div>
            </div>

            <div>
              <div className="flex items-center mb-1">
                <span className="text-xs font-semibold text-[#344054] mr-1">
                  Detected
                </span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-4 w-4 text-[#98A2B3] font-bold" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Time when the threat was detected</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="text-sm">{notification.activity.detected}</div>
            </div>

            <div>
              <div className="flex items-center mb-1">
                <span className="text-xs font-semibold text-[#344054] mr-1">
                  Opened
                </span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-4 w-4 text-[#98A2B3] font-bold" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Time when the email was opened</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="text-sm">{notification.activity.opened}</div>
            </div>

            <div>
              <div className="flex items-center mb-1">
                <span className="text-xs font-semibold text-[#344054] mr-1">
                  Link Clicked
                </span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-4 w-4 text-[#98A2B3] font-bold" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Time when a link in the email was clicked</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="text-sm">{notification.activity.linkClicked}</div>
            </div>

            <div>
              <div className="flex items-center mb-1">
                <span className="text-xs font-semibold text-[#344054] mr-1">
                  First Replied
                </span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-4 w-4 text-[#98A2B3] font-bold" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Time when the email was first replied to</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="text-sm">
                {notification.activity.firstReplied || "N/A"}
              </div>
            </div>

            <div>
              <div className="flex items-center mb-1">
                <span className="text-xs font-semibold text-[#344054] mr-1">
                  Reported
                </span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-4 w-4 text-[#98A2B3] font-bold" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Time when the email was reported</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="text-sm">
                {notification.activity.reported || "N/A"}
              </div>
            </div>

            <div>
              <div className="flex items-center mb-1">
                <span className="text-xs font-semibold text-[#344054] mr-1">
                  Quarantined
                </span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-4 w-4 text-[#98A2B3] font-bold" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Time when the email was Quarantined</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="text-sm">
                {notification.activity.linkClicked || "N/A"}
              </div>
            </div>

            <div>
              <div className="flex items-center mb-1">
                <span className="text-xs font-semibold text-[#344054] mr-1">
                  Attachment Clicked
                </span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-4 w-4 text-[#98A2B3] font-bold" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Time when the email attachement was clicked</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="text-sm">
                {notification.activity.linkClicked || "N/A"}
              </div>
            </div>
          </div>
        </div>

        {/* Security Notes Card */}
        <div className="border-2 border-[#D0D5DD] bg-white p-4 shadow-none mb-4">
          <h2 className="font-semibold mb-2">Kinds Security Notes</h2>
          <p className="text-gray-700 mb-4 text-sm   ">
            This email was sent by{" "}
            <span className="hyphens-auto break-words">
              {emailSummary?.from?.address} at{" "}
            </span>
            {formatDate(emailSummary?.receivedDateTime) || ""} to{" "}
            {notification.recipientEmail} along with{" "}
            {notification.quarantinedThreads} other inboxes managed by{" "}
            <span className="font-medium">{notification.partnerName}</span>. All{" "}
            {notification.quarantinedThreads + 1} message threads have been
            quarantined due to policy settings.
          </p>
          <div className="flex gap-2">
            <Button
              variant={"outline"}
              onClick={handleReject}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              Reject
            </Button>
            <Button
              onClick={handleApprove}
              className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors"
            >
              Approve
            </Button>
          </div>
        </div>

        {/* Message Status */}
        <div className="mb-4">
          <div className="flex items-center mb-1">
            <span className="text-xs font-semibold text-[#344054] mr-1">
              Message status
            </span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="h-4 w-4 text-[#98A2B3] font-bold" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="w-[200px]">
                    Current status of the message in the system
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <div className="border bg-white p-2 mb-4">
            <Badge
              variant="outline"
              className="rounded-full font-normal text-xs border-[#FECDCA] bg-[#FEF3F2] border-2 text-[#B42318]"
            >
              {notification.messageStatus}
            </Badge>
          </div>
        </div>

        {/* Message Type */}
        <div className="mb-4">
          <div className="flex items-center mb-1">
            <span className="text-xs font-semibold text-[#344054] mr-1">
              Message type
            </span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="h-4 w-4 text-[#98A2B3] font-bold" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="w-[200px]">
                    Classification of the message based on threat analysis
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="border bg-white p-2 mb-4">
            <Badge variant="destructive" className="rounded-full font-normal">
              {notification.messageType}
            </Badge>
          </div>
        </div>

        {/* Detections */}
        <div className="mb-6">
          <h3 className="text-sm font-medium mb-2">Detections</h3>
          <div className="flex flex-wrap gap-2">
            {notification.detections.map((detection, index) => (
              <Badge
                key={index}
                variant="outline"
                className="rounded-full font-normal text-xs border-[#D5D9EB] border-2 text-[#363F72]"
              >
                {detection}
              </Badge>
            ))}
          </div>
        </div>

        {/* Sender Details */}
        <div className="mb-6">
          <h3 className="text-sm font-medium mb-2">Sender Details</h3>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <div className="flex items-center mb-1">
                <span className="text-xs font-semibold text-[#344054] mr-1">
                  Sender email
                </span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-4 w-4 text-[#98A2B3] font-bold" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Email address of the sender</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="text-sm">{notification.senderEmail}</div>
            </div>
            <div>
              <div className="flex items-center mb-1">
                <span className="text-xs font-semibold text-[#344054] mr-1">
                  Sender Score {notification.senderScore}
                </span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-4 w-4 text-[#98A2B3] font-bold" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Reputation score of the sender</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              <div className="flex items-center">
                <div className="w-48 h-2 bg-gray-200 rounded-full mr-2">
                  <div
                    className="h-2 bg-red-500 rounded-full"
                    style={{ width: `${notification.senderScore}%` }}
                  />
                </div>
                <span className="text-sm">{notification.senderScore}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Collapsible Sections */}
        <div className="border-t pt-4">
          {/* Other Organizations impacted */}
          <button
            onClick={() => toggleSection("organizations")}
            className="flex justify-between items-center w-full py-2 text-left"
          >
            <h3 className="text-sm font-medium">
              Other Organizations impacted
            </h3>
            {expandedSections.organizations ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </button>
          {expandedSections.organizations && (
            <div className="py-2 text-sm text-[#475467]">
              {notification.impactedOrganizations.join(", ")}
            </div>
          )}
        </div>

        <div className="border-t pt-4">
          {/* Other Domains impacted */}
          <button
            onClick={() => toggleSection("domains")}
            className="flex justify-between items-center w-full py-2 text-left"
          >
            <h3 className="text-sm font-medium">Other Domains impacted</h3>
            {expandedSections.domains ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </button>
          {expandedSections.domains && (
            <div className="py-2 text-sm text-[#475467]">
              {notification.impactedDomains.join(", ")}
            </div>
          )}
        </div>

        <div className="border-t pt-4">
          {/* Organization Details */}
          <button
            onClick={() => toggleSection("orgDetails")}
            className="flex justify-between items-center w-full py-2 text-left"
          >
            <h3 className="text-sm font-medium">Organization Details</h3>
            {expandedSections.orgDetails ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </button>
          {expandedSections.orgDetails && (
            <div className="py-2">
              <div className="flex items-center mb-1">
                <span className="text-xs font-semibold text-[#344054] mr-1">
                  Organization Manager
                </span>
                <Info className="w-4 h-4 text-gray-400" />
              </div>
              <div className="text-sm">{notification.organizationManager}</div>
            </div>
          )}
        </div>
      </div>

      {/* Destructive confirmation modal */}
      <ConfirmationModal
        open={showDestructiveModal}
        onOpenChange={setShowDestructiveModal}
        title="Confirm Rejection"
        message="Are you sure you want to reject this email? This action cannot be undone."
        confirmText="Reject"
        destructive={true}
        onConfirm={handleConfirm}
      />
    </>
  );
}
