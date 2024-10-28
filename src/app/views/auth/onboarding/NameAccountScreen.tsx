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
  prevStep: () => void;
}

export default function NameAccountScreen({
  companyName,
  setCompanyName,
  nextStep,
  prevStep,
}: NameAccountScreenProps) {
  return (
    <>
      <CardHeader>
        <CardTitle>Name your account</CardTitle>
        <p className="text-sm text-muted-foreground">
          This name will be shown only in the admin experience.
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Input
            className="border-kindsGrey"
            id="companyName"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="Company name"
            required
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={prevStep}>
          Back
        </Button>

        <Button onClick={nextStep}>Next</Button>
      </CardFooter>
    </>
  );
}
