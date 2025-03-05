"use client";

import { useState } from "react";
import { ArrowLeft, HelpCircle, Info } from "lucide-react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { InfoItem, InfoItemProps } from "./InfoItem";
import { useFetchEmailLogByIdQuery } from "@/api/m365/logs";

export default function EmailDetailsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("details");

  const { id } = useParams();
  const orgId = Array.isArray(id) ? id[0] : id;

  console.log("ORDID", id)

  const handleGoBack = () => {
    router.back();
  };

  const {data: emailDetails, isError, isLoading} = useFetchEmailLogByIdQuery({orgId})

  console.log("EMAILDETAILS", emailDetails)
  const emailDetailsOverview: InfoItemProps[] = [
    {
      label: "Date and time received",
      value: "11:23:33 AM IST",
      tooltipContent: "Date email received",
    },
    {
      label: "Recipient email",
      value: "user@domain.com",
      tooltipContent: "Recipient email address",
    },
    {
      label: "Sender email",
      value: "user@domain.com",
      tooltipContent: "Sender email address",
    },
    {
      label: "Message status",
      value: "Quarantined",
      tooltipContent: "Date email received",
      isBadge: true,
    },
    {
      label: "Phishing score",
      value: "copy goes here lorem ipsum",
      tooltipContent: "Phishing score rated",
    },
  ];

  const emailSecurityOverview: InfoItemProps[] = [
    {
      label: "Domain reputation",
      value: "copy goes here lorem ipsum......",
      tooltipContent: "Indicates the trustworthiness of the sender's domain.",
    },
    {
      label: "Content analysis",
      value: "copy goes here lorem ipsum......",
      tooltipContent: "Analysis of the email content for potential threats.",
    },
    {
      label: "Recipient analysis",
      value: "copy goes here lorem ipsum......",
      tooltipContent:
        "Checks if the recipient details align with known patterns.",
    },
    {
      label: "Time analysis",
      value: "copy goes here lorem ipsum......",
      tooltipContent:
        "Examines the time the email was sent and received for anomalies.",
    },
    {
      label: "Security score",
      value: "100",
      tooltipContent:
        "A numerical representation of the email's security assessment.",
    },
  ];

  const emailSecurityScores: InfoItemProps[] = [
    {
      label: "Attachment risk",
      value: 100,
      tooltipContent:
        "Indicates the risk level of any attachments in the email.",
    },
    {
      label: "Email authentication",
      value: 100,
      tooltipContent: "Verifies if the email passes authentication checks.",
    },
    {
      label: "SPF",
      value: 100,
      tooltipContent:
        "Checks if the email sender is authorized by the domain's SPF record.",
    },
    {
      label: "DKIM",
      value: 100,
      tooltipContent:
        "Validates the integrity of the email using DKIM signatures.",
    },
    {
      label: "DMARC",
      value: 100,
      tooltipContent:
        "Ensures email alignment and enforcement based on DMARC policy.",
    },
  ];

  const emailThreatAnalysis: InfoItemProps[] = [
    {
      label: "Authentication score",
      value: "copy goes here lorem ipsum......",
      tooltipContent:
        "Evaluates the strength of email authentication mechanisms.",
    },
    {
      label: "Sender score",
      value: "copy goes here lorem ipsum......",
      tooltipContent:
        "Assesses the reputation and trustworthiness of the sender.",
    },
    {
      label: "Content score",
      value: "copy goes here lorem ipsum......",
      tooltipContent:
        "Analyzes the email content for potential phishing or malicious intent.",
    },
    {
      label: "Behavioral score",
      value: "copy goes here lorem ipsum......",
      tooltipContent:
        "Examines user interaction patterns to detect suspicious behavior.",
    },
    {
      label: "Spam score",
      value: 100,
      tooltipContent:
        "Indicates the likelihood of the email being classified as spam.",
    },
    {
      label: "Malware detection",
      value: 100,
      tooltipContent:
        "Checks if the email contains any potential malware or harmful links.",
    },
  ];





  return (
    <div className="layout h-full">
      <Button
        variant="ghost"
        className="mb-4 pl-0 flex items-center gap-1"
        onClick={handleGoBack}
      >
        <ArrowLeft className="h-4 w-4" />
        Go back
      </Button>

      <div className="mb-6">
        <h1 className="text-2xl font-bold">Subject line of email</h1>
        <p className="text-muted-foreground">Subject line of email</p>
      </div>

      <Tabs
        defaultValue="details"
        value={activeTab}
        onValueChange={setActiveTab}
      >
        <TabsList className="border-b w-full justify-start rounded-none pb-0 mb-6">
          <TabsTrigger
            value="details"
            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary"
          >
            Details
          </TabsTrigger>
          <TabsTrigger
            value="email"
            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary"
          >
            Email
          </TabsTrigger>
          <TabsTrigger
            value="lorem1"
            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary"
          >
            Lorem ipsum
          </TabsTrigger>
          <TabsTrigger
            value="lorem2"
            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary"
          >
            Lorem ipsum
          </TabsTrigger>
          <TabsTrigger
            value="lorem3"
            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary"
          >
            Lorem ipsum
          </TabsTrigger>
          <TabsTrigger
            value="similar"
            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary"
          >
            Similar
          </TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
            {emailDetailsOverview.map((item: InfoItemProps, index) => {
              return (
                <InfoItem
                  label={item.label}
                  value={item.value}
                  tooltipContent={item.tooltipContent}
                  isBadge={item.isBadge || false}
                  key={index}
                />
              );
            })}
          </div>

          <Section title="Security factors" description="lorem ipsum...">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
              {emailSecurityOverview.map((item: InfoItemProps, index) => {
                return (
                  <InfoItem
                    label={item.label}
                    value={item.value}
                    tooltipContent={item.tooltipContent}
                    isBadge={item.isBadge || false}
                    key={index}
                  />
                );
              })}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
              {emailSecurityScores.map((item: InfoItemProps, index) => {
                return (
                  <InfoItem
                    label={item.label}
                    value={item.value}
                    tooltipContent={item.tooltipContent}
                    isBadge={item.isBadge || false}
                    key={index}
                  />
                );
              })}
            </div>
          </Section>

          <Section title="Threat Analysis" description="lorem ipsum...">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
              {emailThreatAnalysis.map((item: InfoItemProps, index) => {
                return (
                  <InfoItem
                    label={item.label}
                    value={item.value}
                    tooltipContent={item.tooltipContent}
                    isBadge={item.isBadge || false}
                    key={index}
                  />
                );
              })}
            </div>
          </Section>

          <Section title="Detections" description="lorem ipsum...">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
              {emailThreatAnalysis.map((item: InfoItemProps, index) => {
                return (
                  <InfoItem
                    label={item.label}
                    value={item.value}
                    tooltipContent={item.tooltipContent}
                    isBadge={item.isBadge || false}
                    key={index}
                  />
                );
              })}
            </div>
          </Section>
        </TabsContent>

        <TabsContent value="email">
          <div className="p-6 border rounded-md">
            <p>Email content would go here...</p>
          </div>
        </TabsContent>


        <TabsContent value="similar">
          <div className="p-6 border rounded-md">
            <p>Similar emails would be listed here...</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function ScoreItem({ label, score }: any) {
  return (
    <div className="space-y-1">
      <div className="flex items-center gap-1 text-sm font-medium text-muted-foreground">
        {label}
        <Info className="h-4 w-4" />
      </div>
      <div className="text-sm font-medium">{score}</div>
    </div>
  );
}

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: any;
}) {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-1">{title}</h2>
      <p className="text-muted-foreground mb-4">{description}</p>
      {children}
      <Separator className="mt-8" />
    </div>
  );
}
