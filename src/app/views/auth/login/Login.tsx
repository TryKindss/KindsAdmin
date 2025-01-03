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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Images from "@/utils/images";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginAuth() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-sm rounded-lg">
        <CardHeader className="space-y-1 text-center">
          <div className="flex items-center justify-center">
            <Logo />
          </div>
          <CardTitle className="text-xl font-bold">Welcome Back</CardTitle>
          <p className="text-sm text-gray-500">Login in less than a minute</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-[#344054]">
              Work Email*
            </Label>
            <Input
              className="border-kindsGrey"
              id="email"
              placeholder="Enter your email"
              required
              type="email"
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
            {/* <p className="text-xs text-gray-500">
              Must be at least 8 characters
            </p> */}
          </div>
          <Button
            variant={"outline"}
            size={"lg"}
            className="w-full bg-[#182230] text-white"
            onClick={() => router.push("/")}
          >
            Login
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
            Continue with Google
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
            Don't have an account?{" "}
            <Link href="/register" className="text-blue-500 hover:underline">
              Register
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
