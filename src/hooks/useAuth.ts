import { useCallback, useEffect, useState } from 'react';
import { authApi, type SignUpCredentials, type LoginCredentials, type UserInfoResponse } from '@/services/api/auth';
import { getToken, removeToken } from '@/services/api/client';

export interface AuthState {
  user: UserInfoResponse | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

/**
 * useAuth Hook
 * Manages authentication state and provides methods for login, signup, logout, and fetching current user
 */
export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: false,
    error: null,
    isAuthenticated: false,
  });

  // Check if user is already logged in on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = getToken();
      if (token) {
        try {
          setState((prev) => ({ ...prev, isLoading: true }));
          const user = await authApi.getCurrentUser();
          setState({
            user,
            isLoading: false,
            error: null,
            isAuthenticated: true,
          });
        } catch (error) {
          console.error('Failed to fetch current user:', error);
          removeToken();
          setState({
            user: null,
            isLoading: false,
            error: null,
            isAuthenticated: false,
          });
        }
      }
    };

    checkAuth();
  }, []);

  const login = useCallback(
    async (credentials: LoginCredentials) => {
      try {
        setState((prev) => ({ ...prev, isLoading: true, error: null }));
        const response = await authApi.login(credentials);
        setState({
          user: response.user,
          isLoading: false,
          error: null,
          isAuthenticated: true,
        });
        return response;
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Login failed';
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error: errorMessage,
        }));
        throw error;
      }
    },
    []
  );

  const signup = useCallback(
    async (credentials: SignUpCredentials) => {
      try {
        setState((prev) => ({ ...prev, isLoading: true, error: null }));
        const response = await authApi.signup(credentials);
        setState({
          user: response.user,
          isLoading: false,
          error: null,
          isAuthenticated: true,
        });
        return response;
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Signup failed';
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error: errorMessage,
        }));
        throw error;
      }
    },
    []
  );

  const logout = useCallback(() => {
    try {
      authApi.logout();
      setState({
        user: null,
        isLoading: false,
        error: null,
        isAuthenticated: false,
      });
    } catch (error) {
      console.error('Logout error:', error);
    }
  }, []);

  return {
    ...state,
    login,
    signup,
    logout,
  };
}
