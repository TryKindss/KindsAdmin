"use client";

import { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useRouter } from "next/navigation";

import { useRegisterOnboardingMutation } from "@/api/auth/registerUser";
import { useToast } from "@/hooks/use-toast";

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
import { Loader2 } from "lucide-react";

interface FinishRegisterProps {
  userId: string;
}

// The shape of form data you collect
interface OnboardingDetails {
  accountName: string;
  timezone: string;
  accountsManaged: string;
  inboxesManaged: string;
  emailProvider: string;
}

// Yup validation schema
const onboardingSchema = yup.object().shape({
  accountName: yup.string().required("Account name is required"),
  timezone: yup.string().required("Timezone is required"),
  accountsManaged: yup
    .string()
    .required("Please select how many accounts you manage"),
  inboxesManaged: yup
    .string()
    .required("Please select how many inboxes you manage"),
  emailProvider: yup.string().required("Please choose an email provider"),
});

export default function FinishRegister({ userId }: FinishRegisterProps) {
  const router = useRouter();
  const { toast } = useToast();

  // RTK Query mutation
  const [registerOnboarding, { isLoading }] = useRegisterOnboardingMutation();

  // Initialize Formik
  const formik = useFormik<OnboardingDetails>({
    initialValues: {
      accountName: "",
      timezone: "los-angeles", // default selection
      accountsManaged: "1-5", // default selection
      inboxesManaged: "1-5", // default selection
      emailProvider: "outlook", // default selection
    },
    validationSchema: onboardingSchema,
    onSubmit: async (values) => {
      try {
        await registerOnboarding({
          userId,
          onboadingDetails: values,
        }).unwrap();

        toast({
          title: "Account verified",
          description:
            "Your account has been created successfully, proceed to login.",
          duration: 4000,
        });

        router.push("/");
      } catch (err) {
        toast({
          variant: "destructive",
          title: "Error",
          description: (err as any)?.data?.error || "Something went wrong",
          duration: 4000,
        });
      }
    },
  });

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>Create your top level account</CardTitle>
        <CardDescription>Tell us a bit about your company.</CardDescription>
      </CardHeader>

      <form onSubmit={formik.handleSubmit}>
        <CardContent className="space-y-6">
          {/* Account Name */}
          <div className="space-y-2">
            <Label htmlFor="accountName">Account name</Label>
            <Input
              id="accountName"
              placeholder="Grayson Industries"
              {...formik.getFieldProps("accountName")}
            />
            {formik.touched.accountName && formik.errors.accountName && (
              <p className="text-red-600 text-sm">
                {formik.errors.accountName}
              </p>
            )}
          </div>

          {/* Timezone */}
          <div className="space-y-2">
            <Label htmlFor="timezone">Timezone</Label>
            <Select
              value={formik.values.timezone}
              onValueChange={(val) => formik.setFieldValue("timezone", val)}
            >
              <SelectTrigger id="timezone">
                <SelectValue placeholder="Select Timezone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="los-angeles">
                  Los Angeles, United States
                  <span className="ml-2 text-muted-foreground">02:45 PM</span>
                </SelectItem>
                <SelectItem value="new-york">
                  New York, United States
                  <span className="ml-2 text-muted-foreground">05:45 PM</span>
                </SelectItem>
                <SelectItem value="london">
                  London, UK
                  <span className="ml-2 text-muted-foreground">10:45 PM</span>
                </SelectItem>
                {/* Add more timezones as needed */}
              </SelectContent>
            </Select>
            {formik.touched.timezone && formik.errors.timezone && (
              <p className="text-red-600 text-sm">{formik.errors.timezone}</p>
            )}
            <p className="text-sm text-muted-foreground">
              All project graphs, ranges and timestamps will be matched to this
              timezone. Can be updated later.
            </p>
          </div>

          {/* Accounts Managed */}
          <div className="space-y-2">
            <Label htmlFor="accountsManaged">
              How many accounts do you manage?
            </Label>
            <Select
              value={formik.values.accountsManaged}
              onValueChange={(val) =>
                formik.setFieldValue("accountsManaged", val)
              }
            >
              <SelectTrigger id="accountsManaged">
                <SelectValue placeholder="Select number of accounts" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1-5">1-5</SelectItem>
                <SelectItem value="6-10">6-10</SelectItem>
                <SelectItem value="11-20">11-20</SelectItem>
                <SelectItem value="20+">20+</SelectItem>
              </SelectContent>
            </Select>
            {formik.touched.accountsManaged &&
              formik.errors.accountsManaged && (
                <p className="text-red-600 text-sm">
                  {formik.errors.accountsManaged}
                </p>
              )}
          </div>

          {/* Inboxes Managed */}
          <div className="space-y-2">
            <Label htmlFor="inboxesManaged">
              How many inboxes do you manage?
            </Label>
            <Select
              value={formik.values.inboxesManaged}
              onValueChange={(val) =>
                formik.setFieldValue("inboxesManaged", val)
              }
            >
              <SelectTrigger id="inboxesManaged">
                <SelectValue placeholder="Select number of inboxes" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1-5">1-5</SelectItem>
                <SelectItem value="6-10">6-10</SelectItem>
                <SelectItem value="11-20">11-20</SelectItem>
                <SelectItem value="20+">20+</SelectItem>
              </SelectContent>
            </Select>
            {formik.touched.inboxesManaged && formik.errors.inboxesManaged && (
              <p className="text-red-600 text-sm">
                {formik.errors.inboxesManaged}
              </p>
            )}
          </div>

          {/* Email Provider */}
          <div className="space-y-2">
            <Label htmlFor="emailProvider">
              Which email provider needs protection?
            </Label>
            <Select
              value={formik.values.emailProvider}
              onValueChange={(val) =>
                formik.setFieldValue("emailProvider", val)
              }
            >
              <SelectTrigger id="emailProvider">
                <SelectValue placeholder="Select provider" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Outlook">Outlook</SelectItem>
                <SelectItem value="Gmail">Gmail</SelectItem>
                <SelectItem value="Yahoo">Yahoo Mail</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            {formik.touched.emailProvider && formik.errors.emailProvider && (
              <p className="text-red-600 text-sm">
                {formik.errors.emailProvider}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="outline"
            size="lg"
            className="w-full bg-[#182230] text-white"
            disabled={!formik.isValid || isLoading}
          >
            {isLoading ? (
              <Loader2 className="text-center animate-spin" />
            ) : (
              "Create account"
            )}
          </Button>
        </CardContent>
      </form>
    </Card>
  );
}
