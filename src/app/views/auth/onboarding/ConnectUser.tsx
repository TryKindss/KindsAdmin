"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Images from "@/utils/images";
import { Hand, Lock, Mail, RefreshCw } from "lucide-react";
import Image from "next/image";
import { SetStateAction, useState } from "react";

export function ConnectUsersScreen1({
  nextStep,
  prevStep,
}: {
  nextStep: () => void;
  prevStep: () => void;
}) {
  const [selected, setSelected] = useState<SetStateAction<string | null>>(null);
  const handleSelect = (sel: string) => {
    setSelected(sel);
  };
  return (
    <>
      <CardHeader>
        <CardTitle>Get Started by connecting your users</CardTitle>
        <p className="text-sm text-muted-foreground">
          Users will receive an invite and full access within their inboxes to
          begin sending secure messages and files.
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Card
            className={`cursor-pointer border-kindsGrey pt-4 flex flex-col justify-between ${
              selected === "flux" ? "ring-2 ring-primary" : ""
            }`}
            onClick={() => handleSelect("flux")}
          >
            <CardContent>
              <div className="flex items-center space-x-2 mb-2">
                <Image alt="" src={Images.icons.fluxCube} />
                <h3 className="font-semibold">Flux</h3>
              </div>
              <p className="text-sm text-gray-500 mb-4">Encryption for email</p>
            </CardContent>
            <CardFooter className="border-t border-kindsGrey py-2">
              <div className="flex w-full justify-between items-center">
                <Button variant="link" className="text-tertiary p-0">
                  Details
                </Button>
                <Button variant="link" className="text-primary">
                  Subscribe
                </Button>
              </div>
            </CardFooter>
          </Card>
          <Card
            className={`cursor-pointer border-kindsGrey pt-4 flex flex-col justify-between ${
              selected === "unwanted" ? "ring-2 ring-primary" : ""
            }`}
            onClick={() => handleSelect("unwanted")}
          >
            <CardContent>
              <div className="flex items-center space-x-2 mb-2">
                <Image alt="" src={Images.icons.unwanted} />
                <h3 className="font-semibold">Unwanted</h3>
              </div>
              <p className="text-sm text-gray-500 mb-4">
                Reduce unwanted mail. Keep your users stay focused and reduce
                false positives.
              </p>
            </CardContent>
            <CardFooter className="border-t border-kindsGrey py-2">
              <div className="flex w-full justify-between items-center">
                <Button variant="link" className="text-tertiary p-0">
                  Details
                </Button>
                <Button variant="link" className="text-primary">
                  Subscribe
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={prevStep}>
          Back
        </Button>
        <Button onClick={nextStep} disabled={!selected}>
          Next
        </Button>
      </CardFooter>
    </>
  );
}
