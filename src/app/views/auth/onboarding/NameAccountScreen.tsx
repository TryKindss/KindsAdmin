import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export interface NameAccountScreenProps {
  companyName: string;
  setCompanyName: (companyName: string) => void;
  nextStep: () => void;
}

export default function NameAccountScreen({
  companyName,
  setCompanyName,
  nextStep,
}: NameAccountScreenProps) {
  return (
    <>
      <CardHeader>
        <CardTitle>Name your account</CardTitle>
        <p className="text-sm text-muted-foreground">
          This name will be shown when you share.
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Label htmlFor="companyName">Company Name</Label>
          <Input
            id="companyName"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="Acme Inc."
            required
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={nextStep}>
          Next
        </Button>
      </CardFooter>
    </>
  );
}
