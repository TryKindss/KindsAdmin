"use client";
import Logo from "@/app/scaffold/navigation/Logo";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

interface ConfirmProps {
  email: string;
  setStep: (step: number) => void;
}

export default function ConfirmRegister(props: ConfirmProps) {
  const { email, setStep } = props;
  const router = useRouter();
  return (
    <>
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
            Didnt receive a code?
            <Button variant={"link"} className="font-bold">
              Resend.
            </Button>
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-center items-center">
            <InputOTP maxLength={6} className="flex flex-col gap-4">
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

          <Button
            variant={"outline"}
            size={"lg"}
            className="w-full bg-[#182230] text-white"
            onClick={() => {
              setStep(2);
              router.push("/register?emailVerified");
            }}
          >
            Confirm Email
          </Button>
        </CardContent>
        {/* <CardFooter className="flex flex-col space-y-4">
          <p className="text-xs text-center text-gray-500">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-500 hover:underline">
              Log in
            </Link>
          </p>
        </CardFooter> */}
      </Card>
    </>
  );
}
