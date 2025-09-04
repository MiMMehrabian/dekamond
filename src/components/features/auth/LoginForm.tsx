"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useMobileVerification } from "@/lib/hooks/useMobileVerification";
import { useRandomUser } from "@/lib/hooks/useRandomUser";
import { useUser } from "@/lib/contexts/UserContext";
import { useToast } from "@/components/ui/use-toast";
import { mobileSchema, MobileFormData } from "@/lib/constants/validation";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useState, useCallback, useMemo } from "react";
import { useQueryClient } from "@tanstack/react-query";

interface MobileVerificationFormProps {
  className?: string;
  onSuccess?: (data: MobileFormData) => void;
  onError?: (error: Error) => void;
  onSignUp?: () => void;
  onVerificationSent?: (data: MobileFormData) => void;
}

export function MobileVerificationForm({
  className,
  onSuccess,
  onError,
  onSignUp,
  onVerificationSent,
}: MobileVerificationFormProps) {
  const [shouldFetchUser, setShouldFetchUser] = useState(false);
  const { setUser } = useUser();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Memoized form configuration for performance
  const formConfig = useMemo(
    () => ({
      resolver: zodResolver(mobileSchema),
      defaultValues: {
        mobile: "",
      },
      mode: "onChange" as const,
    }),
    []
  );

  const { isSubmitting, isSuccess } = useMobileVerification({
    onSuccess,
    onError,
    onVerificationSent: useCallback(
      (data: MobileFormData) => {
        onVerificationSent?.(data);
        toast({
          title: "Verification Sent",
          description: `Verification code sent to ${data.mobile}`,
        });
      },
      [onVerificationSent, toast]
    ),
  });

  const { data: randomUserData, isLoading: isUserLoading } =
    useRandomUser(shouldFetchUser);

  // Memoized error message for performance
  const errorMessage = useMemo(() => {
    if (randomUserData && !isUserLoading) {
      return null;
    }
    return null;
  }, [randomUserData, isUserLoading]);

  useEffect(() => {
    if (errorMessage) {
      toast({
        variant: "destructive",
        title: "Error",
        description: errorMessage,
      });
    }
  }, [errorMessage, toast]);

  const form = useForm<MobileFormData>(formConfig);

  useEffect(() => {
    return () => {
      queryClient.removeQueries({ queryKey: ["randomUser"] });
    };
  }, [queryClient]);

  useEffect(() => {
    if (isSuccess) {
      form.reset();
    }
  }, [isSuccess, form]);

  const handleSubmit = useCallback(
    async (data: MobileFormData) => {
      queryClient.removeQueries({ queryKey: ["randomUser"] });
      setShouldFetchUser(true);

      setTimeout(() => {
        onSuccess?.(data);
      }, 1000);
    },
    [queryClient, onSuccess]
  );

  const storeUserData = useCallback(() => {
    if (randomUserData && !isUserLoading) {
      const randomUser = randomUserData.results[0];

      try {
        setUser(randomUser);
        toast({
          title: "Login Successful",
          description: `Welcome back, ${randomUser.name.first} ${randomUser.name.last}!`,
        });
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Login Error",
          description: "Failed to save user data. Please try again.",
        });
      }
    }
  }, [randomUserData, isUserLoading, setUser, toast]);

  useEffect(() => {
    storeUserData();
  }, [storeUserData]);

  // Memoized disabled state for performance
  const isDisabled = useMemo(
    () => isSubmitting || isUserLoading,
    [isSubmitting, isUserLoading]
  );

  // Memoized button text for performance
  const buttonText = useMemo(
    () => (isDisabled ? "Logging in..." : "Login"),
    [isDisabled]
  );

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <Card
        className="w-full max-w-md mx-auto shadow-soft card-hover scale-in"
        role="main"
        aria-labelledby="login-title"
      >
        <CardHeader className="space-y-3 pb-6">
          <CardTitle
            id="login-title"
            className="text-2xl font-bold text-center gradient-text"
          >
            Welcome Back
          </CardTitle>
          <p className="text-center text-muted-foreground text-sm">
            Enter your mobile number to continue
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-6"
              aria-label="Mobile verification form"
            >
              <FormField
                control={form.control}
                name="mobile"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel
                      className="text-sm font-medium text-foreground"
                      htmlFor="mobile-input"
                    >
                      Mobile Number
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        id="mobile-input"
                        type="tel"
                        placeholder="09xxxxxxxxx"
                        disabled={isDisabled}
                        aria-describedby="mobile-error"
                        aria-invalid={!!form.formState.errors.mobile}
                        className="input-enhanced h-12 text-base transition-all duration-200 ease-out focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      />
                    </FormControl>
                    <FormMessage id="mobile-error" className="text-xs" />
                  </FormItem>
                )}
              />

              {/* Success message with ARIA live region */}
              {randomUserData && (
                <div
                  className="slide-up p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg"
                  role="status"
                  aria-live="polite"
                  aria-label="User data retrieved successfully"
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-2 h-2 bg-green-500 rounded-full animate-pulse"
                      aria-hidden="true"
                    ></div>
                    <div className="flex-1">
                      <p className="text-sm text-blue-700 font-medium">
                        User Data Retrieved
                      </p>
                      <p className="text-xs text-blue-600 mt-1">
                        {randomUserData.results[0].name.first}{" "}
                        {randomUserData.results[0].name.last}
                      </p>
                      <p className="text-xs text-blue-600">
                        {randomUserData.results[0].email}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-green-600 mt-2 font-medium">
                    ✓ Stored in localStorage
                  </p>
                </div>
              )}

              <Button
                type="submit"
                className="w-full h-12 text-base font-medium btn-primary shadow-soft hover:shadow-medium transition-all duration-200 ease-out"
                disabled={isDisabled}
                aria-describedby="submit-status"
              >
                {isDisabled ? (
                  <div className="flex items-center space-x-2">
                    <div
                      className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"
                      aria-hidden="true"
                    ></div>
                    <span>{buttonText}</span>
                  </div>
                ) : (
                  buttonText
                )}
              </Button>

              {/* Hidden status for screen readers */}
              <div id="submit-status" className="sr-only">
                {isDisabled
                  ? "Form is submitting, please wait"
                  : "Form is ready to submit"}
              </div>

              {onSignUp && (
                <div className="text-center text-sm pt-2">
                  <span className="text-muted-foreground">
                    Don&apos;t have an account?{" "}
                  </span>
                  <button
                    type="button"
                    onClick={onSignUp}
                    disabled={isSubmitting}
                    className="text-primary hover:text-primary/80 font-medium hover:underline transition-all duration-200 ease-out disabled:opacity-50 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:outline-none"
                    aria-label="Navigate to sign up page"
                  >
                    Sign up
                  </button>
                </div>
              )}
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
