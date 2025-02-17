"use client";
import Logo from "@/app/scaffold/navigation/Logo";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
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
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as yup from "yup";
import { useFormik } from "formik";
import { useRegisterMutation } from "@/api/auth/registerUser";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

interface RegisterProps {
  setEmail: (email: string) => void;
  setStep: (step: number) => void;
}

interface RegisterValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
export default function RegisterForm(props: RegisterProps) {
  const { setEmail, setStep } = props;
  const router = useRouter();

  const registrationSchema = yup.object().shape({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    email: yup
      .string()
      .email("Please enter a valid email")
      .required("Email is required"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema: registrationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const { toast } = useToast();
  const [registerUser, { isError, isLoading }] = useRegisterMutation();

  console.log("isLoading: ", isLoading);

  const handleSubmit = async (values: RegisterValues) => {
    try {
      await registerUser(values)
        .unwrap()
        .then((res) => {
          console.log("RESPONSE_RESGISTER: ", res);
          toast({
            title: "Account created successfully",
            description: "Please check your email to verify your account",
            duration: 5000,
          });
          setStep(1);
          router.push("/register?confirmRegister");
        });
    } catch (err) {
      setStep(0);
      toast({
        variant: "destructive",
        title: "Error",
        description: (err as any)?.data?.error,
        duration: 5000,
      });
      console.log("eropmd", err);
    }
    console.log("Formik values:", values);
    setEmail(values.email);
  };

  return (
    <>
      <Card className="w-full max-w-md rounded-lg">
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
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-[#344054]">
                First Name*
              </Label>
              <Input
                className="border-kindsGrey"
                id="firstName"
                placeholder="Enter your name"
                required
                {...formik.getFieldProps("firstName")}
              />
              {formik.errors.firstName && formik.touched.firstName && (
                <p className="text-red-600 text-xs">
                  {formik.errors.firstName}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="name" className="text-[#344054]">
                Last Name*
              </Label>
              <Input
                className="border-kindsGrey"
                id="lastName"
                placeholder="Enter your last name"
                required
                {...formik.getFieldProps("lastName")}
              />
              {formik.errors.lastName && formik.touched.lastName && (
                <p className="text-red-600 text-xs">{formik.errors.lastName}</p>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="name" className="text-[#344054]">
              Work Email*
            </Label>
            <Input
              className="border-kindsGrey"
              id="email"
              placeholder="Enter your work email"
              required
              type="email"
              {...formik.getFieldProps("email")}
            />
            {formik.errors.email && formik.touched.email && (
              <p className="text-red-600 text-xs">{formik.errors.email}</p>
            )}
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
              {...formik.getFieldProps("password")}
            />
            {formik.errors.password && formik.touched.password && (
              <p className="text-red-600 text-xs">{formik.errors.password}</p>
            )}
          </div>
          <Button
            variant={"outline"}
            size={"lg"}
            className="w-full bg-[#182230] text-white"
            disabled={!formik.isValid || isLoading}
            onClick={() => {
              handleSubmit(formik.values);
            }}
          >
            {isLoading ? (
              <Loader2 className="text-center animate-spin" />
            ) : (
              "Sign up"
            )}
          </Button>
          <p className="text-center">or</p>
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
            Sign up with Google
          </Button>

          <p className="text-xs text-center text-gray-500">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-500 hover:underline">
              Log in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </>
  );
}
