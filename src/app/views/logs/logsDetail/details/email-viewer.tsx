"use client";

import { useState, useRef } from "react";
import { Clipboard, ChevronDown, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

type ViewMode = "html" | "text";

interface EmailViewerProps {
  emailHtml: string;
  emailText: string;
}

export default function EmailViewer({
  emailHtml,
  emailText,
}: EmailViewerProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("html");
  const [copied, setCopied] = useState(false);
  const emailContentRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  //   const emailHtml = `
  //     <div style="font-family: Arial, sans-serif; padding: 20px;">
  //       <h2>[Vendor Name], LLC Payment Advise 31-7-2024</h2>
  //       <div style="margin-bottom: 20px;">
  //         <p><strong>From:</strong> "Jane Claire" &lt;jane.claire@compromised.com&gt;</p>
  //         <p><strong>To:</strong> arjun@renzuinc.com</p>
  //         <p><strong>Date:</strong> Dec 4, 2024 7:00 AM -05:00</p>
  //       </div>
  //
  //       <div style="margin-top: 30px;">
  //         <p>Hi JOHN SMITH,</p>
  //         <p>Sorry for the delay.<br>
  //         Attached is the payment receipt to [Vendor Name], LLC made today 7/31/2024 via bank transfer. Please confirm.</p>
  //         <p>You can view a secured copy of this transaction <a href="#" style="color: blue;">here</a></p>
  //         <p>Best regards</p>
  //         <p>Jane Claire<br>
  //         Account Payable Specialist</p>
  //         <hr>
  //         <p>[Compromised Company Name]<br>
  //         No. 123 Oak Drive,<br>
  //         Town, State<br>
  //         98898, USA<br>
  //         Tel: +1 555 567 5555</p>
  //       </div>
  //     </div>
  //   `
  //
  //   const emailText = `[Vendor Name], LLC Payment Advise 31-7-2024
  //
  // From: "Jane Claire" <jane.claire@compromised.com>
  // To: arjun@renzuinc.com
  // Date: Dec 4, 2024 7:00 AM -05:00
  //
  // Hi JOHN SMITH,
  //
  // Sorry for the delay.
  // Attached is the payment receipt to [Vendor Name], LLC made today 7/31/2024 via bank transfer. Please confirm.
  //
  // You can view a secured copy of this transaction here
  //
  // Best regards
  //
  // Jane Claire
  // Account Payable Specialist
  // -----------------------------------------
  // [Compromised Company Name]
  // No. 123 Oak Drive,
  // Town, State
  // 98898, USA
  // Tel: +1 555 567 5555`

  const copyToClipboard = async () => {
    const content = viewMode === "html" ? emailHtml : emailText;

    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      toast({
        title: "Copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <div className="relative">
      <div className="flex justify-end items-center p-2 mb-6">
        <Button
          variant="outline"
          size="icon"
          className="mr-2"
          onClick={copyToClipboard}
          title="Copy to clipboard"
        >
          {copied ? (
            <Check className="h-4 w-4" />
          ) : (
            <Clipboard className="h-4 w-4" />
          )}
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-1">
              {viewMode === "html" ? "HTML preview" : "Plain text"}
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setViewMode("html")}>
              HTML preview
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setViewMode("text")}>
              Plain text
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div ref={emailContentRef} className="p-4">
        {viewMode === "html" ? (
          <section dangerouslySetInnerHTML={{ __html: emailHtml }} />
        ) : (
          <pre className="whitespace-pre-wrap font-mono text-sm">
            {emailText}
          </pre>
        )}
      </div>
    </div>
  );
}
