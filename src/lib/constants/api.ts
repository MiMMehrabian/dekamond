export const API_ENDPOINTS = {
  EXTERNAL: {
    RANDOM_USER: "https://randomuser.me/api/?results=1&nat=us",
  },
} as const;

export const API_METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  PATCH: "PATCH",
  DELETE: "DELETE",
} as const;

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
} as const;

export const QUERY_KEYS = {
  USERS: {
    RANDOM: ["randomUser"],
  },
} as const;

export const TIMEOUT_CONFIG = {
  SHORT: 5000,
  MEDIUM: 10000,
  LONG: 30000,
} as const;

export const RETRY_CONFIG = {
  DEFAULT: {
    attempts: 3,
    delay: 1000,
    backoff: 2,
  },
  SENSITIVE: {
    attempts: 1,
    delay: 0,
    backoff: 1,
  },
} as const;
