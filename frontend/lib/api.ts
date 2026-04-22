export const API_BASE_URL = "http://localhost:5000";

export const API_ENDPOINTS = {
  health: `${API_BASE_URL}/`,
  authVerify: `${API_BASE_URL}/api/auth/verify`,
} as const;