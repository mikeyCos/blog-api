import axios, { AxiosError, AxiosInstance } from "axios";
import React, {
  createContext,
  SetStateAction,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import config from "../config/env.config";
import useRefreshToken from "./useRefreshToken";

export type AxiosPrivateContext = AxiosInstance;

interface FailedRequests {
  resolve: (value: string | PromiseLike<string>) => void;
  reject: (reason?: any) => void;
}

const AxiosPrivateContext = createContext<AxiosPrivateContext | null>(null);

// const AxiosPrivateProvider: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {

//   return (
//     <AxiosPrivateContext.Provider value={}>
//       {children}
//     </AxiosPrivateContext.Provider>
//   );
// };

interface InitAxiosPrivateProps {
  accessToken: null | string;
  setAccessToken: React.Dispatch<SetStateAction<null | string>>;
  getAccessToken: () => null | string;
  updateAccessToken: (newToken: string | null) => void;
}

const useAxiosPrivateConfig = ({
  accessToken,
  setAccessToken,
  getAccessToken,
  updateAccessToken,
}: InitAxiosPrivateProps) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [failedRequests, setFailedRequests] = useState<FailedRequests[]>([]);
  const refreshToken = useRefreshToken();
  const accessTokenRef = useRef(accessToken);

  const retryFailedRequests = useCallback(
    (error: AxiosError | null = null) => {
      failedRequests.forEach((request) => {
        if (error) {
          request.reject(error);
        } else {
          if (accessToken) {
            request.resolve(accessToken);
          } else {
            // This is unlikely to happen after successful request to /auth/refresh
            request.reject(
              new Error("Access token is null after /auth/refresh")
            );
          }
        }
      });
      setFailedRequests([]);
    },
    [failedRequests, accessToken]
  );

  const axiosPrivate = useMemo(() => {
    const axiosInstance = axios.create({
      baseURL: config.blogAPIBase,
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Attaches access token to request
    axiosInstance.interceptors.request.use(
      (config) => {
        const currentAccessToken = getAccessToken();
        console.group("useAxiosPrivate requestInterceptor");
        console.log("config.url:", config.url);
        console.log(
          "requestInterceptor currentAccessToken:",
          currentAccessToken
        );
        console.groupEnd();
        if (currentAccessToken) {
          config.headers.Authorization = `Bearer ${currentAccessToken}`;
        } else {
          console.log("accessToken not set");
        }

        console.log("config.headers:", config.headers);
        return config;
      },
      (err) => Promise.reject(err)
    );

    axiosInstance.interceptors.response.use(
      (response) => response,
      async (err) => {
        const originalRequest = err.config;

        if (
          (err.request.status === 403 || err.request.status === 401) &&
          !originalRequest._retry
        ) {
          originalRequest._retry = true;
          // If there is an existing request to /auth/refresh
          // Add latest failed request to failedRequests array
          if (isRefreshing) {
            return new Promise<string>((resolve, reject) => {
              setFailedRequests((prev) => [...prev, { resolve, reject }]);
            })
              .then((token) => {
                originalRequest.headers.Authorization = `Bearer ${token}`;
                return axiosInstance(originalRequest);
              })
              .catch((err) => {
                return Promise.reject(err);
              });
          }

          // If there is no existing request to /auth/refresh
          // Allows only one request to /auth/refresh
          setIsRefreshing(true);

          return new Promise(async (resolve, reject) => {
            try {
              const refreshResponse = await refreshToken();
              const newAccessToken = refreshResponse.accessToken;
              updateAccessToken(newAccessToken);

              originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
              retryFailedRequests();
              resolve(axiosInstance(originalRequest));
            } catch (refreshErr: any) {
              console.log("refreshErr:", refreshErr);
              retryFailedRequests(refreshErr);
              setAccessToken(null);
              reject(refreshErr);
            } finally {
              setIsRefreshing(false);
            }
          });
        }
      }
    );

    return axiosInstance;
  }, []);

  return axiosPrivate;
};

const useAxiosPrivate = () => {
  const context = useContext(AxiosPrivateContext);

  if (!context) {
    throw new Error(
      "useAxiosPrivate needs to be called inside AxiosPrivateContext Provider."
    );
  }

  return context;
};

export { useAxiosPrivateConfig as default, useAxiosPrivate };
