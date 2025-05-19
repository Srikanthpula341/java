import { useState, useCallback } from "react";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

interface UseApiRequestResult<T = any> {
  responseData: T | null;
  isLoading: boolean;
  error: any;
  sendRequest: (
    endpoint: string,
    method?: HttpMethod,
    options?: {
      queryParams?: Record<string, any>;
      body?: any;
      config?: AxiosRequestConfig;
    }
  ) => Promise<T | null>;
}

const BASE_API_URL = "https://your-backend-domain.com"; // Replace or load from env

export const useApiRequest = <T = any>(): UseApiRequestResult<T> => {
  const [isLoading, setIsLoading] = useState(false);
  const [responseData, setResponseData] = useState<T | null>(null);
  const [error, setError] = useState<any>(null);

  const sendRequest = useCallback(
    async (
      endpoint: string,
      method: HttpMethod = "GET",
      options?: {
        queryParams?: Record<string, any>;
        body?: any;
        config?: AxiosRequestConfig;
      }
    ): Promise<T | null> => {
      setIsLoading(true);
      setError(null);
      setResponseData(null);

      try {
        const url = `${BASE_API_URL}${endpoint}`;

        const axiosConfig: AxiosRequestConfig = {
          method,
          url,
          ...options?.config,
        };

        if (method === "GET" || method === "DELETE") {
          axiosConfig.params = options?.queryParams;
        } else {
          axiosConfig.data = options?.body;
          axiosConfig.params = options?.queryParams;
        }

        const response: AxiosResponse<T> = await axios(axiosConfig);
        setResponseData(response.data);
        return response.data;
      } catch (err) {
        setError(err);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return {
    sendRequest,
    responseData,
    isLoading,
    error
  };
};
