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
import Link from "next/link";
import { useRouter } from "next/navigation";

interface VerifiedProps {
  setStep: (step: number) => void;
}

export default function EmailVerified(props: VerifiedProps) {
  const { setStep } = props;
  const router = useRouter();
  return (
    <>
      <Card className="w-full max-w-md rounded-lg">
        <CardHeader className="space-y-1 text-center">
          <div className="flex items-center justify-center">
            <Logo />
          </div>
          <CardTitle className="text-xl font-bold">Email Verified</CardTitle>
          <p className="text-sm text-gray-500">
            Enter Account name, this name will only be shown to admins.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="orfName" className="text-[#344054]">
              Account Name*
            </Label>
            <Input
              className="border-kindsGrey"
              id="orgName"
              placeholder="Organization name"
              required
              type="text"
            />
          </div>
          <Button
            variant={"outline"}
            size={"lg"}
            className="w-full bg-[#182230] text-white"
            onClick={() => {
              setStep(3);
              router.push("/register?onboardingSurvey");
            }}
          >
            Proceed
          </Button>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <p className="text-xs text-center text-gray-500">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-500 hover:underline">
              Log in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </>
  );
}
