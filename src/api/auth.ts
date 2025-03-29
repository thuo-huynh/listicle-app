import httpService from '@/src/libs/http';
import secureStorage from '@/src/libs/secure-storage';
import ENDPOINTS from '../constants/endpoints';

/**
 * User login
 * @param values Login credentials (email and password)
 * @returns Auth token if successful
 */
export const login = async (values: {
  email: string;
  password: string;
}): Promise<string | null> => {
  try {
    const response = await httpService.post(ENDPOINTS.LOGIN, values);
    console.log('🚀 ~ response:', response);

    if (response?.success && response?.data?.token) {
      // Store token securely
      await secureStorage.setItem('auth_token', response.data.token);
      return response.data.token;
    }
    return null;
  } catch (error) {
    console.error('Login error:', error);
    return null;
  }
};

/**
 * User signup
 * @param values Registration details
 * @returns Auth token if successful registration and login
 */
export const signup = async (values: {
  email: string;
  password: string;
  [key: string]: any;
}): Promise<string | null> => {
  try {
    const response = await httpService.post(ENDPOINTS.REGISTER, values);

    if (response?.success) {
      const { email, password } = values;
      // Auto login after successful registration
      return await login({ email, password });
    }
    return null;
  } catch (error) {
    console.error('Signup error:', error);
    return null;
  }
};

/**
 * Logout
 * Removes the auth token from secure storage
 */
export const logout = async (): Promise<void> => {
  try {
    await secureStorage.removeItem('auth_token');
  } catch (error) {
    console.error('Logout error:', error);
  }
};

/**
 * Check if user is authenticated
 * @returns Boolean indicating if valid auth token exists
 */
export const isAuthenticated = async (): Promise<boolean> => {
  try {
    const token = await secureStorage.getItem('auth_token');
    return !!token;
  } catch (error) {
    console.error('Auth check error:', error);
    return false;
  }
};
