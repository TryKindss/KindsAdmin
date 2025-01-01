import { Boxes } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Logo from "@/app/scaffold/navigation/Logo";

interface VerifiedProps {
  setStep: (step: number) => void;
}

export default function EmailVerified({ setStep }: VerifiedProps) {
  return (
    <Card className="w-full max-w-sm">
      <CardContent className="pt-6 text-center space-y-4">
        <div className="flex justify-center">
          <Logo />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight">Thank you</h2>
          <p className="text-muted-foreground">
            Lets finish setting up your account.
          </p>
        </div>
        <Button
          variant={"outline"}
          size={"lg"}
          className="w-full bg-[#182230] text-white"
          onClick={() => setStep(3)}
        >
          Complete account setup
        </Button>
      </CardContent>
    </Card>
  );
}
