"use client";

import { useEffect, useState } from "react";
import {
  Check,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Info,
  Loader2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ConfirmationModal } from "@/components/global/confirmation-modal";
import {
  EmailByIdResponse,
  useUpdateEmailActionStatusMutation,
  useUpdateEmailDetectionsMutation,
  useUpdateEmailMessageTypeMutation,
} from "@/api/m365/emails";
import { formatDate, formatTimeFull } from "@/lib/utils";
import { Select } from "@radix-ui/react-select";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getBadgeVariant } from "@/utils/helper";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";

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

type StatusOption = {
  value: string;
  label: string;
};

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

  const statusOptions: StatusOption[] = [
    {
      value: "delivered",
      label: "delivered",
    },
    {
      value: "blocked",
      label: "blocked",
    },
    {
      value: "quarantined",
      label: "quarantined",
    },
    {
      value: "normal",
      label: "normal",
    },
  ];

  const messageTypeOption = [
    {
      value: "malicious",
      label: "malicious",
    },
    {
      value: "non-malicious",
      label: "non-malicious",
    },
  ];

  const detectionOptions = [
    "Impersonation",
    "Suspicious Sender",
    "Marketing",
    "Suspicious Attachment",
    "Contains PHI",
    "Contains PII",
    "Credentials Detected",
    "Social Engineering",
    "Blocklist",
    "Allowlist",
    "Sexual harassment",
    "Sexual content",
    "Racism",
    "Financial data",
    "Spear-phishing",
    "Whaling",
    "Clone Phishing",
    "Business Email Compromise",
    "Gift Card Scam",
  ];

  // over-complicated state ::: modularize to simpler string state ???
  const [status, setStatus] = useState<string>(
    statusOptions.find(
      (item) => item.label.toLowerCase() === emailSummary?.action?.toLowerCase()
    )?.label || ""
  );
  const [messageType, setMessageType] = useState<string>(
    messageTypeOption.find(
      (item) =>
        item.label.toLowerCase() === emailSummary?.messageType?.toLowerCase()
    )?.label || ""
  );

  console.log("MESSAGETYPE", messageType);

  const { toast } = useToast();

  // detection multi-select variable here
  const [open, setOpen] = useState(false);
  const [detections, setDetections] = useState<string[]>(
    emailSummary?.detections || []
  );
  const [tempSelections, setTempSelections] = useState<string[]>([]);

  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen) {
      setTempSelections([...detections]);
    }
    setOpen(isOpen);
  };

  const handleOptionToggle = (option: string) => {
    setTempSelections((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };

  // update email actions/status functions below ----
  const [
    updateStatus,
    {
      isLoading: updateStatusLoading,
      data: updateStatusData,
      isError: updateStatusError,
    },
  ] = useUpdateEmailActionStatusMutation();

  // update email messageType functions below ----
  const [
    updateMessageType,
    {
      isLoading: updateMessageTypeLoading,
      data: updateMessageTypeData,
      isError: updateMessageTypeError,
    },
  ] = useUpdateEmailMessageTypeMutation();

  // update email detection functions below ----
  const [
    updateDetections,
    {
      isLoading: updateDetectionsLoading,
      data: updateDetectionsData,
      isError: updateDetectionsError,
    },
  ] = useUpdateEmailDetectionsMutation();

  // ----------------------

  const updateEmailStatus = async (emailStatus: string) => {
    try {
      await updateStatus({
        emailId: emailSummary.id,
        action: emailStatus.toUpperCase(),
      })
        .unwrap()
        .then((data) => {
          console.log("RESPONSE DATA", data);
          toast({
            title: "Status updated",
            duration: 3000,
          });
        });
    } catch (error) {}
  };

  const updateEmailMessageType = async (emailMessageType: string) => {
    try {
      await updateMessageType({
        emailId: emailSummary.id,
        messageType: emailMessageType,
      })
        .unwrap()
        .then((data) => {
          console.log("RESPONSE DATA", data);
          toast({
            title: "Message Type Updated",
            duration: 3000,
          });
        });
    } catch (error) {}
  };

  const updateEmaildetections = async () => {
    try {
      await updateDetections({
        emailId: emailSummary.id,
        detections: [...tempSelections],
      })
        .unwrap()
        .then((data) => {
          console.log("RESPONSE DATA", data);
          setDetections([...tempSelections]);
          setOpen(false);
          toast({
            title: "Detections Updated",
            duration: 3000,
          });
        });
    } catch (error) {}
  };

  useEffect(() => {
    setStatus(emailSummary?.action?.toLowerCase());
    setMessageType(emailSummary?.messageType?.toLowerCase());
  }, [emailSummary]);

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
              <div className="text-sm break-all">
                {emailSummary?.activity?.recipientEmail}
              </div>
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
              <div className="text-sm uppercase">
                {emailSummary?.activity?.received
                  ? formatTimeFull(emailSummary?.activity?.received)
                  : "-"}
              </div>
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
              <div className="text-sm uppercase">
                {emailSummary?.activity?.detected
                  ? formatTimeFull(emailSummary?.activity?.detected)
                  : "-"}
              </div>
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
              <div className="text-sm uppercase">
                {emailSummary?.activity?.opened
                  ? formatTimeFull(emailSummary?.activity?.opened)
                  : "-"}
              </div>
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
              <div className="text-sm uppercase">
                {emailSummary?.activity?.linkClicked
                  ? formatTimeFull(emailSummary?.activity?.linkClicked)
                  : "-"}
              </div>
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
              <div className="text-sm uppercase">
                {emailSummary?.activity?.firstReplied
                  ? formatTimeFull(emailSummary?.activity?.firstReplied)
                  : "-"}
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
              <div className="text-sm uppercase">
                {emailSummary?.activity?.reported
                  ? formatTimeFull(emailSummary?.activity?.reported)
                  : "-"}
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
              <div className="text-sm uppercase">
                {emailSummary?.activity?.reported
                  ? formatTimeFull(emailSummary?.activity?.reported)
                  : "-"}
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
              <div className="text-sm uppercase">
                {emailSummary?.activity?.opened
                  ? formatTimeFull(emailSummary?.activity?.opened)
                  : "-"}
              </div>
            </div>
          </div>
        </div>

        {/* Security Notes Card */}
        {/* <div className="border-2 border-[#D0D5DD] bg-white p-4 shadow-none mb-4">
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
        </div> */}

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
            {updateStatusLoading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <Select
                value={status}
                onValueChange={(value) => {
                  setStatus(value);
                  updateEmailStatus(value);
                }}
              >
                <SelectTrigger className="w-full border-0 p-0 h-auto shadow-none focus:ring-0 focus:ring-offset-0">
                  <SelectValue placeholder="Select status">
                    <Badge
                      variant="outline"
                      className={`rounded-full font-normal text-xs border-2 capitalize ${getBadgeVariant(
                        status
                      )}}`}
                    >
                      {status}
                    </Badge>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      <Badge
                        variant="outline"
                        className={`rounded-full font-normal text-xs border-2 ${getBadgeVariant(
                          option.value
                        )} capitalize`}
                      >
                        {option.label}
                      </Badge>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
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
            {updateMessageTypeLoading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <Select
                value={messageType}
                onValueChange={(value) => {
                  setMessageType(value);
                  updateEmailMessageType(value);
                  console.log("VLAUE", value);
                }}
              >
                <SelectTrigger className="w-full border-0 p-0 h-auto shadow-none focus:ring-0 focus:ring-offset-0">
                  <SelectValue placeholder="Select status">
                    <Badge
                      variant="outline"
                      className={`rounded-full font-normal text-xs border-2 capitalize ${getBadgeVariant(
                        messageType
                      )}}`}
                    >
                      {messageType}
                    </Badge>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {messageTypeOption.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      <Badge
                        variant="outline"
                        className={`rounded-full font-normal text-xs border-2 ${getBadgeVariant(
                          option.value
                        )} capitalize`}
                      >
                        {option.label}
                      </Badge>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
        </div>

        {/* Detections */}
        <div className="mb-4">
          <div className="flex items-center mb-1">
            <span className="text-xs font-semibold text-[#344054] mr-1">
              Detection types
            </span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="h-4 w-4 text-[#98A2B3] font-bold" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="w-[200px]">
                    Types of detections found in the message
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <div className="border bg-white p-2 mb-4">
            <Popover open={open} onOpenChange={handleOpenChange}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-between font-normal text-left p-1 h-auto border-0 shadow-none"
                >
                  <div className="flex flex-wrap gap-1 max-w-[90%] overflow-hidden">
                    {detections.length === 0 ? (
                      <Badge
                        variant="outline"
                        className="rounded-full font-normal text-xs border-2 border-[#E4E7EC] bg-[#F9FAFB] text-[#344054]"
                      >
                        Select detections
                      </Badge>
                    ) : (
                      detections.map((detection) => (
                        <Badge
                          key={detection}
                          variant="outline"
                          className="rounded-full font-normal text-xs border-2 border-[#E4E7EC] bg-[#F9FAFB] text-[#344054]"
                        >
                          {detection}
                        </Badge>
                      ))
                    )}
                  </div>
                  <ChevronDown className="h-4 w-4 opacity-50 flex-shrink-0" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[300px] p-0" align="start">
                <div className="max-h-[300px] overflow-auto p-1">
                  {detectionOptions.map((option) => (
                    <div
                      key={option}
                      className="flex items-center space-x-2 p-2 hover:bg-slate-50 rounded cursor-pointer"
                      onClick={() => handleOptionToggle(option)}
                    >
                      <Checkbox
                        id={`option-${option}`}
                        checked={tempSelections.includes(option)}
                        onCheckedChange={() => handleOptionToggle(option)}
                      />
                      <label
                        htmlFor={`option-${option}`}
                        className="text-sm cursor-pointer flex-grow"
                      >
                        {option}
                      </label>
                      {tempSelections.includes(option) && (
                        <Check className="h-4 w-4 text-[#027A48]" />
                      )}
                    </div>
                  ))}
                </div>
                <div className="p-2 border-t flex justify-end">
                  <Button
                    size="sm"
                    onClick={updateEmaildetections}
                    disabled={updateDetectionsLoading}
                    className={`bg-[#7F56D9] hover:bg-[#6941C6] text-white text-center`}
                  >
                    {updateDetectionsLoading ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      "Update"
                    )}
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
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
              <div className="text-sm text-wrap">
                {emailSummary?.from?.address}
              </div>
            </div>
            <div>
              <div className="flex items-center mb-1">
                <span className="text-xs font-semibold text-[#344054] mr-1">
                  Sender Score
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
                    style={{ width: `${emailSummary?.senderScore}%` }}
                  />
                </div>
                <span className="text-sm">{emailSummary?.senderScore}%</span>
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

          {expandedSections.organizations &&
            emailSummary?.impactedOrganizations?.map((item) => (
              <p className="py-2 text-sm text-[#475467]">{item.name}</p>
            ))}
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
          {expandedSections.domains &&
            emailSummary?.impactedDomains?.map((item) => (
              <p className="py-2 text-sm text-[#475467]">{item.name}</p>
            ))}
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
            <div className="py-2 space-y-4">
              <div>
                <div className="flex items-center mb-1">
                  <span className="text-xs font-semibold text-[#344054] mr-1">
                    Organization Name
                  </span>
                  <Info className="w-4 h-4 text-gray-400" />
                </div>
                <p className="text-sm">
                  {emailSummary.organizationDetails.name}
                </p>
              </div>
              <div>
                <div className="flex items-center mb-1">
                  <span className="text-xs font-semibold text-[#344054] mr-1">
                    Organization Display Name
                  </span>
                  <Info className="w-4 h-4 text-gray-400" />
                </div>
                <p className="text-sm">
                  {emailSummary.organizationDetails.displayName}
                </p>
              </div>
              <div>
                <div className="flex items-center mb-1">
                  <span className="text-xs font-semibold text-[#344054] mr-1">
                    Domain
                  </span>
                  <Info className="w-4 h-4 text-gray-400" />
                </div>
                <p className="text-sm">
                  {emailSummary.organizationDetails.domain}
                </p>
              </div>
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
