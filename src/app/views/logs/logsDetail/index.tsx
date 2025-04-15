"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { EmailByIdResponse, useFetchEmailLogByIdQuery } from "@/api/m365/logs";
import DOMPurify from "dompurify";
import { useDashboardTabContext } from "@/providers/DashboardTabContext";
import EmailSummary from "./details/information-summary";
import { useAppSelector } from "@/hooks";
import Showdown from "showdown";
import EmailViewer from "./details/email-viewer";
import SimilarEmailTable from "./details/similar-email-table";

export default function EmailDetailsPage() {
  const { setActive } = useDashboardTabContext();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("email");

  const { id } = useParams();
  const orgId = Array.isArray(id) ? id[0] : id;

  console.log("ORDID", id);

  const handleGoBack = () => {
    router.back();
  };

  const token = useAppSelector((state) => state.authState.token);
  const {
    data: emailDetails,
    isError,
    isLoading,
  } = useFetchEmailLogByIdQuery(
    { orgId },
    {
      skip: !token,
    }
  );

  console.log("EMAILDETAILS", emailDetails);

  const sanitizedContent = DOMPurify.sanitize(emailDetails?.body || "");

  const converter = new Showdown.Converter({ simplifiedAutoLink: true });
  const showContent = converter.makeHtml(emailDetails?.body || "");

  console.log("showCOntent ", emailDetails?.body);

  console.log("Sanitized content ", sanitizedContent);

  const renderError = !isLoading && (emailDetails as any)?.error ? true : false;

  console.log(renderError);

  useEffect(() => {
    setActive("logs");
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="layout min-h-[50vh] w-full flex justify-center items-center">
          <Loader2 className="animate-spin text-black w-6 h-6" />
        </div>
      ) : renderError ? (
        <div className="layout min-h-[50vh] w-full flex flex-col justify-center items-center gap-4">
          <p>{(emailDetails as any)?.message}</p>
          <Button
            onClick={handleGoBack}
            className="hover:bg-black hover:text-white"
          >
            Go Back
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-7 gap- pb-8">
          <div className="layout h-full col-span-5">
            <div className="flex items-center py-4 text-sm">
              <Button
                variant="ghost"
                className="pl-0 flex items-center gap-1 hover:bg-transparent text-sm"
                onClick={handleGoBack}
                size={"sm"}
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="text-lg font-medium">Emails</span>
              </Button>
              <span className="text-xl text-[#D0D5DD] pr-4">/</span>
              <h1 className="font-medium text-[#6941C6]">
              {emailDetails?.subject}
              </h1>
            </div>

            <div className="mb-6 capitalize">
              <h1 className="text-2xl font-bold">{emailDetails?.subject}</h1>
              {/* <p className="text-muted-foreground">{emailDetails?.subject}</p> */}
            </div>
            <Tabs
              defaultValue="email"
              value={activeTab}
              onValueChange={setActiveTab}
              className="bg-none"
            >
              <TabsList className="border-b w-full justify-start rounded-none pb-0 mb-6 !bg-transparent">
                <TabsTrigger
                  value="email"
                  className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-black data-[state=active]:rounded-none data-[state=active]:shadow-none data-[state=active]:bg-[#F9F5FF] "
                >
                  Email
                </TabsTrigger>
                <TabsTrigger
                  value="similar"
                  className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-black data-[state=active]:rounded-none data-[state=active]:shadow-none data-[state=active]:bg-[#F9F5FF] "
                >
                  Similar Messages
                </TabsTrigger>
              </TabsList>

              <TabsContent value="email">
                <div className=" mx-auto bg-white shadow-sm p-8 email-content">
                  <EmailViewer
                    emailHtml={emailDetails?.htmlBody || ""}
                    emailText={emailDetails?.plainTextBody || ""}
                  />
                </div>
              </TabsContent> 

              <TabsContent value="similar">
              <div className=" mx-auto bg-white shadow-sm p-8 ">
                  <SimilarEmailTable similarEmails={emailDetails?.similarEmails || []}/>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          <div className="layout h-full col-span-2">
            <div>
              <EmailSummary emailSummary={emailDetails as EmailByIdResponse} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
