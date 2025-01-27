"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Images from "@/utils/images";
import { useCreateAccountContext } from "@/providers/CreateAccountContext";
import { useLazyConnectMsAccountQuery } from "@/api/m365/auth";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

export default function InboxSyncCard() {
  const { step, setStep } = useCreateAccountContext();

  const [triggerConnectMsAccount, { isLoading, isError, isSuccess, data }] =
    useLazyConnectMsAccountQuery();

  const router = useRouter();
  const { toast } = useToast();

  const handleConnect = async () => {
    try {
      await triggerConnectMsAccount()
        .unwrap()
        .then((data) => {
          console.log("RESPONSE____ ", data);
          if (data?.url) {
            window.open(data.url, "_self");
            toast({
              title: "Authenticating",
              description: "Redirecting to Microsoft.",
            });
            setStep(3);
          }
        });
    } catch (error) {
      // console.error("Error:", error);
      toast({
        title: "Error",
        description: "Try again.",
        variant: "destructive",
      });
    }
  };
  return (
    <Card className="w-full max-w-md border shadow-none">
      <CardHeader>
        <CardTitle>Get Started by connecting your users</CardTitle>
        <CardDescription>
          Users will receive an invite and full access within their inboxes to
          begin sending secure messages and files.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <Button
          variant="outline"
          className="w-full justify-start h-12 font-normal"
          onClick={() => handleConnect()}
        >
          <div className="flex items-center">
            <Image
              src={Images.emailLog.gmail}
              alt="Google"
              width={24}
              height={24}
              className="mr-2"
            />
            {isLoading ? (
              <Loader2 className="animate-spin text-black w-4 h-4" />
            ) : (
              <p className="font-medium ">Connect with Google</p>
            )}
          </div>
        </Button>
        <Button
          variant="outline"
          className="w-full justify-start h-12 font-normal"
          onClick={() => handleConnect()}
        >
          <div className="flex items-center">
            <Image
              src={Images.emailLog.ms_outlook}
              alt="Microsoft"
              width={24}
              height={24}
              className="mr-2"
            />
            <p className="font-medium ">Connect with Microsoft Graph</p>
          </div>
        </Button>
      </CardContent>
    </Card>
  );
}
