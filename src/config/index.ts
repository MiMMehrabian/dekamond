/**
 * Application Configuration
 * Centralized configuration management for environment variables and app settings
 */

export const config = {
  // Environment
  env: process.env.NODE_ENV || "development",
  isDevelopment: process.env.NODE_ENV === "development",
  isProduction: process.env.NODE_ENV === "production",
  isTest: process.env.NODE_ENV === "test",

  // API Configuration
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api",
    timeout: 10000,
    retries: 3,
  },

  app: {
    name: "Dekamond",
    version: "1.0.0",
    description: "",
    author: "Mohammad Mahdi Mehrabian",
    url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  },

  features: {
    darkMode: true,
    analytics: process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === "true",
    notifications: true,
  },

  ui: {
    theme: {
      default: "light",
      storageKey: "dekamond-theme",
    },
    animations: {
      enabled: true,
      duration: 200,
    },
  },

  // SEO Configuration
  seo: {
    defaultTitle: "Dekamond - Professional Next.js Application",
    defaultDescription:
      "A modern, scalable Next.js application built with best practices",
    defaultImage: "/og-image.png",
    twitterHandle: "@yourhandle",
  },
} as const;

// Type-safe configuration access
export type Config = typeof config;
export type AppConfig = Config["app"];
export type ApiConfig = Config["api"];
export type UIConfig = Config["ui"];
