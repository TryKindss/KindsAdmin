import Logo from "@/app/scaffold/navigation/Logo";
import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Images from "@/utils/images";
import { Link2 } from "lucide-react";
import Image from "next/image";

export interface LoginScreenProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  nextStep: () => void;
}

export default function LoginScreen({
  email,
  setEmail,
  password,
  setPassword,
  nextStep,
}: LoginScreenProps) {
  return (
    <div className="w-[25em] max-w-md">
      <CardHeader className="space-y-2 text-center">
        <div className="flex items-center justify-center">
          <Logo />
        </div>
        <CardTitle className="text-xl font-bold">Admin Login</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Input
            className="border-kindsGrey"
            id="email"
            placeholder="Enter your email"
            required
            type="email"
          />
        </div>
        <div className="space-y-2">
          <Input
            className="border-kindsGrey"
            id="password"
            placeholder="Create a password"
            required
            type="password"
          />
          <p className="text-xs text-gray-500">Must be at least 8 characters</p>
        </div>
        <Button
          variant={"outline"}
          size={"lg"}
          className="w-full bg-[#182230] text-white"
          onClick={nextStep}
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
          Sign in with Google
        </Button>
        <Button
          size={"lg"}
          variant="outline"
          className="w-full border-kindsGrey"
        >
          <Image
            src={Images.socialIcons.microsoft}
            alt=""
            className="w-5 h-5 mr-2"
          />
          Sign in with Microsoft
        </Button>
        <p className="text-xs text-center text-gray-500">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-500 hover:underline">
            Register
          </a>
        </p>
      </CardFooter>
    </div>
  );
}
