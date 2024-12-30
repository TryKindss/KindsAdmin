"use client";
import Logo from "@/app/scaffold/navigation/Logo";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Images from "@/utils/images";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function RegisterSurvey() {
  const router = useRouter();
  return (
    <>
      <Card className="w-full max-w-md rounded-lg">
        <CardHeader className="space-y-1 text-center">
          <div className="flex items-center justify-center">
            <Logo />
          </div>
          <CardTitle className="text-xl font-bold">Tell us about you</CardTitle>
          <p className="text-sm text-gray-500">
            Lets customize your onboarding exerience.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">
              How many accounts do you manage?
            </label>
            <Select defaultValue="1-5">
              <SelectTrigger>
                <SelectValue placeholder="Select number of accounts" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1-5">1-5</SelectItem>
                <SelectItem value="6-10">6-10</SelectItem>
                <SelectItem value="11-20">11-20</SelectItem>
                <SelectItem value="20+">20+</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              How many inboxes do you manage?
            </label>
            <Select defaultValue="1-5">
              <SelectTrigger>
                <SelectValue placeholder="Select number of inboxes" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1-5">1-5</SelectItem>
                <SelectItem value="6-10">6-10</SelectItem>
                <SelectItem value="11-20">11-20</SelectItem>
                <SelectItem value="20+">20+</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Which email provider needs protection?
            </label>
            <Select defaultValue="outlook">
              <SelectTrigger>
                <SelectValue placeholder="Select email provider" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gmail">Google Workspace</SelectItem>
                <SelectItem value="outlook">Outlook</SelectItem>
                <SelectItem value="multiple">Google Workspace & Outlook</SelectItem>
                <SelectItem value="other">Others</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            variant={"outline"}
            size={"lg"}
            className="w-full bg-[#182230] text-white"
            onClick={() => {
              router.push("/");
            }}
          >
            Go to Dashboard
          </Button>
        </CardContent>
      </Card>
    </>
  );
}
