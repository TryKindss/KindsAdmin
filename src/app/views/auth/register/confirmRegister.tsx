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
} from "@/components/ui/input-otp"

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
          <CardTitle className="text-xl font-bold">Almost there...</CardTitle>
          <p className="text-sm text-gray-500">We sent an OTP to {email}</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-center items-center">
            <InputOTP maxLength={6}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
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
          <Button
            variant={"ghost"}
            size={"lg"}
            className="w-full mt-4 "
            onClick={() => {
              // Add your resend OTP logic here
              console.log("Resend OTP clicked");
            }}
          >
            Resend OTP
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
