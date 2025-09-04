import { MobileFormData } from "@/lib/constants/validation";
import { useCallback, useEffect, useState } from "react";

export interface UseMobileVerificationOptions {
  onSuccess?: (data: MobileFormData) => void;
  onError?: (error: Error) => void;
  onVerificationSent?: (data: MobileFormData) => void;
}

export interface UseMobileVerificationReturn {
  isSubmitting: boolean;
  isSuccess: boolean;
  error: string | null;
  submitVerification: (data: MobileFormData) => Promise<void>;
  reset: () => void;
}

export function useMobileVerification(
  options: UseMobileVerificationOptions = {}
): UseMobileVerificationReturn {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(0);
  const [lastMobile, setLastMobile] = useState<string>("");

  const { onSuccess, onError, onVerificationSent } = options;

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const submitVerification = useCallback(
    async (data: MobileFormData) => {
      if (isSubmitting) return;

      setIsSubmitting(true);
      setError(null);
      setIsSuccess(false);

      try {
        setLastMobile(data.mobile);
        setCountdown(60);
        setIsSuccess(true);
        onVerificationSent?.(data);
        onSuccess?.(data);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Verification failed";
        setError(errorMessage);
        onError?.(err instanceof Error ? err : new Error(errorMessage));
      } finally {
        setIsSubmitting(false);
      }
    },
    [isSubmitting, onSuccess, onError, onVerificationSent]
  );

  const reset = useCallback(() => {
    setIsSubmitting(false);
    setIsSuccess(false);
    setError(null);
    setCountdown(0);
    setLastMobile("");
  }, []);

  return {
    isSubmitting,
    isSuccess,
    error,
    submitVerification,
    reset,
  };
}
