import { ApiService } from "@/services";
import axios, { AxiosRequestConfig } from "axios";
import React, { useCallback, useLayoutEffect, useRef, useState } from "react";
import { useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import { UserInfos } from "./UserTypes";

const ACCESS_TOKEN_KEY = "accessToken";
const storage = localStorage;

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [userInfos, setUserInfos] = useState<UserInfos | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const isInitialized = useRef(false);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const isAuthenticated = !!userInfos?.username;

  const { authenticate } = ApiService(
    async <T,>(endpoint: string, options?: AxiosRequestConfig) => {
      return await axios.request<T>({
        ...options,
        baseURL: process.env.API_BASE_URI,
        url: endpoint,
      });
    }
  );

  const login = React.useCallback(
    async ({
      username,
      password,
      redirectTo,
    }: {
      username: string;
      password: string;
      redirectTo?: string | null;
    }) => {
      const response = await authenticate({ username, password });
      setAccessToken(response.accessToken);
      setUserInfos(response.userInfos);
      storage.setItem(ACCESS_TOKEN_KEY, response.accessToken);
      navigate(redirectTo ?? "/", {
        replace: true,
      });
    },
    [authenticate, navigate]
  );

  const logout = React.useCallback(() => {
    setUserInfos(null);
    setAccessToken(null);
    storage.clear();
    queryClient.invalidateQueries();
    queryClient.clear();
    navigate("/");
  }, [queryClient, navigate]);

  const checkCredentials = useCallback(
    (params?: { redirectTo?: string | null }) => {
      const storedToken = storage.getItem(ACCESS_TOKEN_KEY);
      if (!storedToken) {
        setIsLoading(false);
        return;
      }

      const { checkCredentials } = ApiService(
        async <T,>(endpoint: string, options?: AxiosRequestConfig) => {
          const authorization = { Authorization: `Bearer ${storedToken}` };
          const headers = {
            ...authorization,
            ...options?.headers,
          };
          return await axios.request<T>({
            ...options,
            headers,
            baseURL: process.env.API_BASE_URI,
            url: endpoint,
          });
        }
      );

      checkCredentials()
        .then((user) => {
          setAccessToken(storedToken);
          setUserInfos(user);
          navigate(params?.redirectTo ?? "/", {
            replace: true,
          });
        })
        .catch(() => logout())
        .finally(() => setIsLoading(false));
    },
    [logout, navigate]
  );

  useLayoutEffect(() => {
    function storageSync(event: StorageEvent) {
      if (
        (event.key === ACCESS_TOKEN_KEY && event.newValue === null) ||
        event.key === null
      ) {
        logout();
      } else if (event.key === ACCESS_TOKEN_KEY && event.newValue !== null) {
        isInitialized.current = false;
        setIsLoading(true);
      }
    }
    window.addEventListener("storage", storageSync);
    return () => window.removeEventListener("storage", storageSync);
  }, [logout]);

  return (
    <UserContext.Provider
      value={{
        login,
        logout,
        checkCredentials,
        isAuthenticated,
        isLoading,
        accessToken,
        userInfos,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
