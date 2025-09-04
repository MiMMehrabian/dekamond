import { z } from "zod";

/**
 * Validation Schemas
 * Centralized validation schemas for consistent form validation across the application
 */

// ============================================================================
// Mobile Number Validation
// ============================================================================

export const iranianMobileRegex = /^(09|\+989|00989)\d{9}$/;

export const validateIranianMobile = (mobile: string): boolean => {
  return iranianMobileRegex.test(mobile);
};

export const mobileSchema = z.object({
  mobile: z
    .string()
    .min(1, "Mobile number is required")
    .refine(validateIranianMobile, {
      message: "Please enter a valid Iranian mobile number",
    }),
});

export type MobileFormData = z.infer<typeof mobileSchema>;

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
