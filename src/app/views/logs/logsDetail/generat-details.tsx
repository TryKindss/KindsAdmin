import { Separator } from "@/components/ui/separator";
import { TabsContent } from "@/components/ui/tabs";
import React from "react";
import { InfoItem, InfoItemProps } from "./InfoItem";
import { formatDate } from "@/lib/utils";

function GeneralInfo({emailDetails}: any) {
  const emailDetailsOverview: InfoItemProps[] = [
    {
      label: "Date and time received",
      value: formatDate(emailDetails?.receivedDateTime || ""),
      tooltipContent: "Date email received",
    },
    {
      label: "Recipient email",
      value: "user@domain.com",
      tooltipContent: "Recipient email address",
    },
    {
      label: "Sender email",
      value: `${emailDetails?.from?.address?.slice(0, 20)}...`,
      tooltipContent: "Sender email address",
    },
    {
      label: "Message status",
      value: emailDetails?.status,
      tooltipContent: "Status of email received",
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
      value:
        emailDetails?.securityDetails?.factors?.domainReputation?.description,
      tooltipContent: "Indicates the trustworthiness of the sender's domain.",
    },
    {
      label: "Content analysis",
      value:
        emailDetails?.securityDetails?.factors?.contentAnalysis?.description,
      tooltipContent: "Analysis of the email content for potential threats.",
    },
    {
      label: "Recipient analysis",
      value:
        emailDetails?.securityDetails?.factors?.recipientAnalysis?.description,
      tooltipContent:
        "Checks if the recipient details align with known patterns.",
    },
    {
      label: "Time analysis",
      value: emailDetails?.securityDetails?.factors?.timeAnalysis?.description,
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
      value: emailDetails?.securityDetails?.authentication?.dkim?.result,
      tooltipContent:
        "Indicates the risk level of any attachments in the email.",
    },
    {
      label: "Email authentication",
      value: emailDetails?.securityDetails?.authentication?.dkim?.result,
      tooltipContent: "Verifies if the email passes authentication checks.",
    },
    {
      label: "SPF",
      value: emailDetails?.securityDetails?.authentication?.spf?.result,
      tooltipContent:
        "Checks if the email sender is authorized by the domain's SPF record.",
      isBadge: true,
    },
    {
      label: "DKIM",
      value: emailDetails?.securityDetails?.authentication?.dkim?.result,
      tooltipContent:
        "Validates the integrity of the email using DKIM signatures.",
      isBadge: true,
    },
    {
      label: "DMARC",
      value: emailDetails?.securityDetails?.authentication?.dmarc?.result,
      tooltipContent:
        "Ensures email alignment and enforcement based on DMARC policy.",
      isBadge: true,
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
      label: "Overall score",
      value: emailDetails?.securityDetails?.score,
      tooltipContent:
        "Indicates the likelihood of the email being classified as spam.",
    },
    {
      label: "Malware detection",
      value: emailDetails?.securityDetails?.score,
      tooltipContent:
        "Checks if the email contains any potential malware or harmful links.",
    },
  ];


  return (
    <>
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
    </>
  );
}

export default GeneralInfo;

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
