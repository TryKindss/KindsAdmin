"use client";
import React, { useState } from "react";
import RegisterForm from "./RegisterForm";
import ConfirmRegister from "./confirmRegister";
import EmailVerified from "./emailVerified";
import FinishRegister from "./finish-register";
export default function RegisterFlow() {
  const [step, setStep] = useState<number>(0);
  const [email, setEmail] = useState<string>("");

  const nextStep = () => {
    setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setStep((prev) => Math.max(0, prev - 1));
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return <RegisterForm setStep={setStep} setEmail={setEmail} />;
      case 1: {
        return <ConfirmRegister email={email} setStep={setStep} />;
      }
      case 2: {
        return <EmailVerified setStep={setStep} />;
      }
      case 3: {
        return <FinishRegister />;
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {renderStep()}
    </div>
  );
}
