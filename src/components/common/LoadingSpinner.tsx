import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  variant?: "default" | "primary" | "secondary";
  className?: string;
  text?: string;
  "aria-label"?: string;
}

const sizeClasses = {
  sm: "h-4 w-4",
  md: "h-8 w-8",
  lg: "h-12 w-12",
};

const variantClasses = {
  default: "border-gray-300 border-t-gray-600",
  primary: "border-gray-300 border-t-primary",
  secondary: "border-gray-300 border-t-secondary",
};

export function LoadingSpinner({
  size = "md",
  variant = "default",
  className,
  text,
  "aria-label": ariaLabel,
}: LoadingSpinnerProps) {
  return (
    <div
      className={cn("flex flex-col items-center justify-center", className)}
      role="status"
      aria-label={ariaLabel || "Loading"}
      aria-live="polite"
    >
      <div
        className={cn(
          "animate-spin rounded-full border-2 border-solid transition-all duration-300 ease-out",
          sizeClasses[size],
          variantClasses[variant]
        )}
        style={{
          animation: "spin 1s linear infinite",
        }}
        aria-hidden="true"
      />
      {text && (
        <p className="mt-3 text-sm text-muted-foreground font-medium animate-pulse">
          {text}
        </p>
      )}
    </div>
  );
}

// Full screen loading component with enhanced styling
export function FullScreenLoader({
  text = "Loading...",
  "aria-label": ariaLabel,
}: {
  text?: string;
  "aria-label"?: string;
}) {
  return (
    <div
      className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center p-4"
      role="main"
      aria-label={ariaLabel || "Loading page"}
    >
      <div className="text-center space-y-6">
        <div className="relative">
          <LoadingSpinner
            size="lg"
            variant="primary"
            aria-label="Page loading spinner"
          />
          <div
            className="absolute inset-0 rounded-full border-2 border-primary/20 animate-ping"
            aria-hidden="true"
          ></div>
        </div>
        <div className="space-y-2">
          <p className="text-lg font-medium text-foreground">{text}</p>
          <div className="flex justify-center space-x-1" aria-hidden="true">
            <div
              className="w-2 h-2 bg-primary/60 rounded-full animate-bounce"
              style={{ animationDelay: "0ms" }}
            ></div>
            <div
              className="w-2 h-2 bg-primary/60 rounded-full animate-bounce"
              style={{ animationDelay: "150ms" }}
            ></div>
            <div
              className="w-2 h-2 bg-primary/60 rounded-full animate-bounce"
              style={{ animationDelay: "300ms" }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Inline loading component with subtle animation
export function InlineLoader({
  size = "sm",
  "aria-label": ariaLabel,
}: {
  size?: "sm" | "md" | "lg";
  "aria-label"?: string;
}) {
  return (
    <div className="flex items-center justify-center p-2">
      <LoadingSpinner
        size={size}
        variant="primary"
        aria-label={ariaLabel || "Loading content"}
      />
    </div>
  );
}

// Skeleton loading component for content
export function SkeletonLoader({
  className,
  lines = 3,
  "aria-label": ariaLabel,
}: {
  className?: string;
  lines?: number;
  "aria-label"?: string;
}) {
  return (
    <div
      className={cn("space-y-3", className)}
      role="status"
      aria-label={ariaLabel || `Loading ${lines} content lines`}
      aria-live="polite"
    >
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="h-4 bg-muted rounded animate-pulse"
          style={{
            animationDelay: `${i * 100}ms`,
          }}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

// Pulse loading component
export function PulseLoader({
  className,
  "aria-label": ariaLabel,
}: {
  className?: string;
  "aria-label"?: string;
}) {
  return (
    <div
      className={cn("flex space-x-2", className)}
      role="status"
      aria-label={ariaLabel || "Loading"}
      aria-live="polite"
    >
      <div
        className="w-2 h-2 bg-primary rounded-full animate-pulse"
        style={{ animationDelay: "0ms" }}
        aria-hidden="true"
      ></div>
      <div
        className="w-2 h-2 bg-primary rounded-full animate-pulse"
        style={{ animationDelay: "200ms" }}
        aria-hidden="true"
      ></div>
      <div
        className="w-2 h-2 bg-primary rounded-full animate-pulse"
        style={{ animationDelay: "400ms" }}
        aria-hidden="true"
      ></div>
    </div>
  );
}
