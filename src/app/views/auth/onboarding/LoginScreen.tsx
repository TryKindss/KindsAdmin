import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link2 } from "lucide-react";

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
    <>
      <CardHeader className="space-y-1 text-center">
        <Link2 className="w-12 h-12 mx-auto text-gray-600" />
        <CardTitle className="text-2xl font-bold">
          Log in to your account
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="m@example.com"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <Button className="w-full" onClick={nextStep}>
          Log in
        </Button>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <Button variant="outline" className="w-full">
          <svg
            className="w-5 h-5 mr-2"
            viewBox="0 0 21 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#a)">
              <path
                d="M20.3081 10.2303c0-.709-.0505-1.378-.1658-2.0328h-9.7855v3.8564h5.5346c-.2385 1.2647-.9754 2.3367-2.0743 3.0557v2.5435h3.3505c1.9595-1.8013 3.1-4.4535 3.1-7.4228z"
                fill="#4285F4"
              />
              <path
                d="M10.3468 20c2.7959 0 5.1452-.9257 6.8566-2.5174l-3.3505-2.5435c-.9283.6234-2.1198.9887-3.5061.9887-2.6906 0-4.9719-1.8047-5.7854-4.2313H1.08v2.6252C2.7915 17.7646 6.2892 20 10.3468 20z"
                fill="#34A853"
              />
              <path
                d="M4.5614 11.7222c-.2083-.6234-.3268-1.2908-.3268-1.9791 0-.6884.1185-1.3558.3268-1.9792V5.4387h-3.467C.3897 6.7274 0 8.3353 0 10.0001c0 1.6648.3897 3.2727 1.0944 4.6614l3.467-2.6252z"
                fill="#FBBC05"
              />
              <path
                d="M10.3468 3.7896c1.5182 0 2.8868.5166 3.9611 1.5308l2.9726-2.9461C15.4969.9303 13.1476 0 10.3468 0 6.2892 0 2.7915 2.2354 1.08 5.4387l3.467 2.6252c.8135-2.4266 3.0948-4.2313 5.7854-4.2313z"
                fill="#EA4335"
              />
            </g>
            <defs>
              <clipPath id="a">
                <path fill="#fff" d="M0 0h20.625v20H0z" />
              </clipPath>
            </defs>
          </svg>
          Sign in with Google
        </Button>
        <Button variant="outline" className="w-full">
          <svg
            className="w-5 h-5 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
          >
            <path
              fill="#0078d4"
              d="M44 40V8a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v32a4 4 0 0 0 4 4h32a4 4 0 0 0 4-4z"
            />
            <path
              d="M30.19 39.35h-5.14v-9.41c0-2.14-.76-3.6-2.67-3.6a2.89 2.89 0 0 0-2.71 1.94 3.61 3.61 0 0 0-.17 1.29v9.78h-5.14V26.21c0-2-.07-3.74-.15-5.2h4.47l.24 2.27h.1a6.09 6.09 0 0 1 5.25-2.63c3.47 0 6.07 2.28 6.07 7.2z"
              fill="#fff"
            />
            <path
              d="M10.32 14.35a2.67 2.67 0 1 1 2.67-2.67 2.67 2.67 0 0 1-2.67 2.67zM7.73 39.35h5.14V21h-5.14z"
              fill="#fff"
            />
          </svg>
          Sign in with Microsoft
        </Button>
      </CardFooter>
    </>
  );
}
