"use client";

import { MobileVerificationForm } from "./LoginForm";
import { MobileFormData } from "@/lib/constants/validation";
import { useRouter } from "next/navigation";
import { useUser } from "@/lib/contexts/UserContext";
import { useEffect } from "react";

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
  const router = useRouter();
  const { isAuthenticated } = useUser();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  const handleSuccess = (data: MobileFormData) => {
    setTimeout(() => {
      router.push("/dashboard");
    }, 1000);
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
