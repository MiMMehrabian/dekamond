import { api, handleApiError } from "../api/client";
import { RandomUserResponse } from "../types/user";

export interface UserService {
  getRandomUser: () => Promise<RandomUserResponse>;
  verifyMobile: (
    mobile: string
  ) => Promise<{ success: boolean; message: string }>;
  updateProfile: (userId: string, data: Partial<unknown>) => Promise<unknown>;
}

class UserServiceImpl implements UserService {
  async getRandomUser(): Promise<RandomUserResponse> {
    try {
      const response = await api.get<RandomUserResponse>(
        "https://randomuser.me/api/?results=1&nat=us"
      );
      return response.data;
    } catch (error) {
      const apiError = handleApiError(error);
      throw new Error(`Failed to fetch random user: ${apiError.message}`);
    }
  }

  async verifyMobile(
    mobile: string
  ): Promise<{ success: boolean; message: string }> {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock verification logic
      const isValid = /^(09|\+989|00989)\d{9}$/.test(mobile);

      if (!isValid) {
        throw new Error("Invalid mobile number format");
      }

      return {
        success: true,
        message: `Verification code sent to ${mobile}`,
      };
    } catch (error) {
      const apiError = handleApiError(error);
      throw new Error(`Mobile verification failed: ${apiError.message}`);
    }
  }

  async updateProfile(
    userId: string,
    data: Partial<unknown>
  ): Promise<unknown> {
    try {
      const response = await api.patch(`/users/${userId}`, data);
      return response.data;
    } catch (error) {
      const apiError = handleApiError(error);
      throw new Error(`Profile update failed: ${apiError.message}`);
    }
  }
}

export const userService = new UserServiceImpl();
