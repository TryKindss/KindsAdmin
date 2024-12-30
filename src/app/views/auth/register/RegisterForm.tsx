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

interface RegisterProps {
  setEmail: (email: string) => void;
  setStep: (step: number) => void;
}

export default function RegisterForm(props: RegisterProps) {
  const { setEmail, setStep } = props;
  const router = useRouter();
  return (
    <>
      <Card className="w-full max-w-md rounded-lg">
        <CardHeader className="space-y-1 text-center">
          <div className="flex items-center justify-center">
            <Logo />
          </div>
          <CardTitle className="text-xl font-bold">
            Start your free trial
          </CardTitle>
          <p className="text-sm text-gray-500">Sign up in less than a minute</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-[#344054]">
              First Name*
            </Label>
            <Input
              className="border-kindsGrey"
              id="firstName"
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="name" className="text-[#344054]">
              Last Name*
            </Label>
            <Input
              className="border-kindsGrey"
              id="lastName"
              placeholder="Enter your last name"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="name" className="text-[#344054]">
              Work Email*
            </Label>
            <Input
              className="border-kindsGrey"
              id="email"
              placeholder="Enter your work email"
              required
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="name" className="text-[#344054]">
              Password*
            </Label>
            <Input
              className="border-kindsGrey"
              id="password"
              placeholder="Create a password"
              required
              type="password"
            />
            <p className="text-xs text-gray-500">
              Must be at least 8 characters
            </p>
          </div>
          <Button
            variant={"outline"}
            size={"lg"}
            className="w-full bg-[#182230] text-white"
            onClick={() => {
              setStep(1);
              router.push("/register?confirmRegister");
            }}
          >
            Get started
          </Button>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button
            size={"lg"}
            variant="outline"
            className="w-full border-kindsGrey"
          >
            <Image
              src={Images.socialIcons.google}
              alt=""
              className="w-5 h-5 mr-2"
            />
            Sign up with Google
          </Button>
          {/* <Button
            size={"lg"}
            variant="outline"
            className="w-full border-kindsGrey"
          >
            <Image
              src={Images.socialIcons.microsoft}
              alt=""
              className="w-5 h-5 mr-2"
            />
            Sign up with Microsoft
          </Button> */}
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
