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

export default function InboxSyncCard() {
  const { step, setStep } = useCreateAccountContext();
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
          onClick={() => setStep(step + 1)}
        >
          <div className="flex items-center">
            <Image
              src={Images.emailLog.gmail}
              alt="Google"
              width={24}
              height={24}
              className="mr-2"
            />
            <p className="font-medium ">Connect with Google</p>
          </div>
        </Button>
        <Button
          variant="outline"
          className="w-full justify-start h-12 font-normal"
          onClick={() => setStep(step + 1)}
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
