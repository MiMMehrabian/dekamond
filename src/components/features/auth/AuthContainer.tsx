"use client";

import { MobileVerificationForm } from "./LoginForm";
import { MobileFormData } from "@/lib/constants/validation";

interface AuthContainerProps {
  className?: string;
  onSuccess?: (data: MobileFormData) => void;
  onError?: (error: Error) => void;
  onSignUp?: () => void;
  onVerificationSent?: (data: MobileFormData) => void;
}

export function AuthContainer({
  className,
  onError,
  onSignUp,
  onVerificationSent,
}: AuthContainerProps) {
  const handleSuccess = (data: MobileFormData) => {
    // Handle successful authentication
    console.log("Authentication successful:", data);
  };

  return (
    <div className={className}>
      <MobileVerificationForm
        onSuccess={handleSuccess}
        onError={onError}
        onSignUp={onSignUp}
        onVerificationSent={onVerificationSent}
      />
    </div>
  );
}
