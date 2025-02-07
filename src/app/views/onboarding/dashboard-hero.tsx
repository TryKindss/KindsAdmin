"use client";
import React, { useEffect } from "react";
import { ExternalLink, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import MainPageWrapper from "@/components/global/wrappers/MainPageWrapper";
import Image from "next/image";
import Images from "@/utils/images";
import { useAppSelector } from "@/hooks";
import { RootState } from "@/store";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

function DashboardHero() {
  const { data } = useSession();

  const user = (data as any)?.user.data.user;
  const router = useRouter();

  useEffect(() => {
    if (user === null) {
      router.push("/login");
    }
  }, [user]);

  console.log("USER", user);

  return (
    <MainPageWrapper>
      <Card className="overflow-hidden w-full">
        <CardContent className="p-8">
          <div className="grid gap-8 md:grid-cols-5 items-center">
            <div className="space-y-6 col-span-4">
              <div className="space-y-2">
                <h1 className="text-2xl font-semibold tracking-tight">
                  Welcome to the party {user.lastName}!,
                </h1>
                <p className="font-semibold">
                  Authorize our platform with your email provider to bring your
                  dashboard to life. Works with popular tools such as Gmail and
                  Outlook.
                </p>
                <p className="font-semibold">
                  All new organizations launch in playground mode and we will
                  not make any changes to your environment, or affect your end
                  users without your final approval.
                </p>
              </div>
              <p className="text-primary font-semibold">
                Press{" "}
                <kbd className="px-2 py-1 font-bold bg-muted rounded border text-gray-500">
                  N
                </kbd>{" "}
                to create a new organization
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="gap-2">
                  <Download className="h-4 w-4" />
                  Install Kinds
                </Button>
                <Button variant="outline" className="gap-2">
                  <ExternalLink className="h-4 w-4" />
                  View our live demo
                </Button>
              </div>
            </div>

            <div className="col-span-1 flex justify-center md:justify-end">
              <Image
                src={Images.illustration.dashboard.welcome}
                alt="Welcome illustration"
                className="h-auto"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </MainPageWrapper>
  );
}

export default DashboardHero;
