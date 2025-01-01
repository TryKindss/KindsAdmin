"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";

export default function FinishRegister() {
  const router = useRouter();
  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>Create your top level account</CardTitle>
        <CardDescription>Tell us a bit about your company.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="account-name">Account name</Label>
          <Input id="account-name" placeholder="Grayson Industries" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="timezone">Timezone</Label>
          <Select defaultValue="los-angeles">
            <SelectTrigger id="timezone">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="los-angeles">
                Los Angeles, United States
                <span className="ml-2 text-muted-foreground">02:45 PM</span>
              </SelectItem>
              {/* Add more timezone options as needed */}
            </SelectContent>
          </Select>
          <p className="text-sm text-muted-foreground">
            All project graphs, ranges and timestamps will be matched to this
            timezone. Can be updated later.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="accounts">How many accounts do you manage?</Label>
          <Select defaultValue="1-5">
            <SelectTrigger id="accounts">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1-5">1-5</SelectItem>
              <SelectItem value="6-10">6-10</SelectItem>
              <SelectItem value="11-20">11-20</SelectItem>
              <SelectItem value="20+">20+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="inboxes">How many inboxes do you manage?</Label>
          <Select defaultValue="1-5">
            <SelectTrigger id="inboxes">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1-5">1-5</SelectItem>
              <SelectItem value="6-10">6-10</SelectItem>
              <SelectItem value="11-20">11-20</SelectItem>
              <SelectItem value="20+">20+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email-provider">
            Which email provider needs protection?
          </Label>
          <Select defaultValue="outlook">
            <SelectTrigger id="email-provider">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="outlook">Outlook</SelectItem>
              <SelectItem value="gmail">Gmail</SelectItem>
              <SelectItem value="yahoo">Yahoo Mail</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button
          variant={"outline"}
          size={"lg"}
          className="w-full bg-[#182230] text-white"
          onClick={() => router.push("/")}
        >
          Create account
        </Button>
      </CardContent>
    </Card>
  );
}
