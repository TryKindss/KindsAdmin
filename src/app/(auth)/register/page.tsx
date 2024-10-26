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
import Images from "@/utils/images";
import Image from "next/image";

export default function Component() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-sm rounded-lg">
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
            <Input id="name" placeholder="Enter your name" required />
          </div>
          <div className="space-y-2">
            <Input
              id="email"
              placeholder="Enter your email"
              required
              type="email"
            />
          </div>
          <div className="space-y-2">
            <Input
              id="password"
              placeholder="Create a password"
              required
              type="password"
            />
            <p className="text-xs text-gray-500">
              Must be at least 8 characters
            </p>
          </div>
          <Button size={"lg"} className="w-full">
            Get started
          </Button>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button size={"lg"} variant="outline" className="w-full">
            <Image
              src={Images.socialIcons.google}
              alt=""
              className="w-5 h-5 mr-2"
            />
            Sign up with Google
          </Button>
          <Button size={"lg"} variant="outline" className="w-full">
            <Image
              src={Images.socialIcons.microsoft}
              alt=""
              className="w-5 h-5 mr-2"
            />
            Sign up with Microsoft
          </Button>
          <p className="text-xs text-center text-gray-500">
            Already have an account?{" "}
            <a href="#" className="text-blue-500 hover:underline">
              Log in
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
