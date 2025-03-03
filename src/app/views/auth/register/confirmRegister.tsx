"use client";

import { useState } from "react";
import Logo from "@/app/scaffold/navigation/Logo";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useResendOTPMutation,
  useVerifyEmailMutation,
} from "@/api/auth/registerUser";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

interface ConfirmProps {
  email: string;
  setStep: (step: number) => void;
  setUserId: (step: string) => void;
}

export default function ConfirmRegister(props: ConfirmProps) {
  const { email, setStep, setUserId } = props;
  const router = useRouter();
  const { toast } = useToast();

  const [code, setCode] = useState("");

  // RTK Query hooks
  const [resendOTP, { isLoading: resendLoading }] = useResendOTPMutation();
  const [verifyOTP, { isLoading: verifyLoading }] = useVerifyEmailMutation();

  // Handle Verify
  const handleVerifyOTP = async (codeValue: string) => {
    try {
      const res = await verifyOTP({ email, code: codeValue }).unwrap();

      toast({
        title: "Email Verified",
        description: "Your account is now verified!",
        duration: 5000,
      });

      setStep(2);
      setUserId(res?.data?.userId);
      router.push("/register?emailVerified");
    } catch (err) {
      console.error("Verify OTP error: ", err);
      toast({
        variant: "destructive",
        title: "Verification Error",
        description: (err as any)?.data?.error || "Could not verify the OTP. Please try again.",
      });
    }
  };

  // Handle Resend
  const handleResendOTP = async () => {
    try {
      await resendOTP({ email }).unwrap();
      toast({
        title: "OTP Resent",
        description: "A new code has been sent to your email.",
        duration: 5000,
      });
    } catch (err) {
      console.error("Resend OTP error: ", err);
      toast({
        variant: "destructive",
        title: "Resend Error",
        description: (err as any)?.data?.error || "Something went wrong",

      });
    }
  };

  return (
    <Card className="w-full max-w-md rounded-lg">
      <CardHeader className="space-y-1 text-center">
        <div className="flex items-center justify-center">
          <Logo />
        </div>
        <CardTitle className="text-xl font-bold">
          We sent a code to your email
        </CardTitle>
        <p className="text-sm text-gray-500">
          To continue, please enter the 6-digit verification code sent to{" "}
          <span className="font-semibold">{email}</span>
        </p>
        <p className="text-sm text-gray-500">
          Didn’t receive a code?{" "}
          <Button
            variant="link"
            className="font-bold p-0 h-auto"
            onClick={handleResendOTP}
            disabled={resendLoading}
          >
            {resendLoading ? (
              <Loader2 className="text-center text-black animate-spin" />
            ) : (
              "Resend"
            )}
          </Button>
        </p>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex justify-center items-center">
          <InputOTP
            maxLength={6}
            className="flex flex-col gap-4"
            // Capture OTP changes
            onChange={(value) => setCode(value)}
          >
            <InputOTPGroup className="flex gap-3">
              <InputOTPSlot
                index={0}
                className="border border-gray-300 rounded-lg p-2 text-center w-12 h-12 font-bold text-3xl text-gray-700"
              />
              <InputOTPSlot
                index={1}
                className="border border-gray-300 rounded-lg p-2 text-center w-12 h-12 font-bold text-3xl text-gray-700"
              />
              <InputOTPSlot
                index={2}
                className="border border-gray-300 rounded-lg p-2 text-center w-12 h-12 font-bold text-3xl text-gray-700"
              />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup className="flex gap-3">
              <InputOTPSlot
                index={3}
                className="border border-gray-300 rounded-lg p-2 text-center w-12 h-12 font-bold text-3xl text-gray-700"
              />
              <InputOTPSlot
                index={4}
                className="border border-gray-300 rounded-lg p-2 text-center w-12 h-12 font-bold text-3xl text-gray-700"
              />
              <InputOTPSlot
                index={5}
                className="border border-gray-300 rounded-lg p-2 text-center w-12 h-12 font-bold text-3xl text-gray-700"
              />
            </InputOTPGroup>
          </InputOTP>
        </div>

        <p className="text-sm text-gray-500 text-center">
          Please check your inbox to log into your account.
        </p>
      </CardContent>

      <CardFooter>
        <Button
          variant="outline"
          size="lg"
          className="w-full bg-[#182230] text-white"
          // onClick={() => console.log(code)}
          onClick={() => handleVerifyOTP(code)}
          disabled={verifyLoading || code.length !== 6}
        >
          {verifyLoading ? (
            <Loader2 className="text-center animate-spin" />
          ) : (
            "Confirm Email"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
