"use client";
import React, { useEffect } from "react";
import { CirclePlus, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import MainPageWrapper from "@/components/global/wrappers/MainPageWrapper";
import Image from "next/image";
import Images from "@/utils/images";
import { useSession } from "next-auth/react";

function DashboardHero() {
  const { data } = useSession();
   
  const user = (data as any)?.user.data.user;
  //   const router = useRouter();
  //
  //   useEffect(() => {
  //     if (user === null) {
  //       router.push("/login");
  //     }
  //   }, [user]);
  //
  //   console.log("USER", user);

  return (
    <MainPageWrapper>
      <Card className="overflow-hidden w-full">
        <CardContent className="p-8">
          <div className="grid gap-8 md:grid-cols-5 items-center justify-between">
            <div className="space-y-6 col-span-4">
              <div className="space-y-2">
                <h1 className="text-2xl font-semibold tracking-tight">
                  Welcome to the party {user.firstName}!,
                </h1>
                <p className="font-semibold max-w-4xl">
                  Authorize our platform with your email provider to bring your
                  dashboard to life. Works with popular tools such as Gmail and
                  Outlook.
                </p>
                <p className="font-semibold ">
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
                <Button className="gap-2 hover:bg-black/80  bg-[#182230]">
                  <CirclePlus className="h-6 w-5" />
                  Install Kinds
                </Button>
                <Button variant="outline" className="gap-2">
                  View our live demo
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="col-span-1 flex justify-center md:justify-end">
              <Image
                src={Images.illustration.dashboard.welcomeImg}
                alt="Welcome illustration"
                className="h-auto relative bottom-[-2em]"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </MainPageWrapper>
  );
}

export default DashboardHero;
