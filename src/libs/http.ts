import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import secureStorage from './secure-storage';

// Environment variables
const API_URL = process.env.API_URL || 'https://listicle.deegeehub.com/api';
const API_TIMEOUT = 30000; // 30 seconds

// Auth token key
const AUTH_TOKEN_KEY = 'auth_token';

// Types
export interface ApiResponse<T = any> {
  data: T;
  status: number;
  success: boolean;
  message?: string;
}

export class HttpService {
  private api: AxiosInstance;
  private static instance: HttpService;

  private constructor() {
    this.api = axios.create({
      baseURL: API_URL,
      timeout: API_TIMEOUT,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    // Request interceptor
    this.api.interceptors.request.use(
      async (config: InternalAxiosRequestConfig) => {
        // Add auth token from secure storage
        const token = await this.getToken();
        if (token) {
          config.headers = config.headers || {};
          config.headers.Authorization = `${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    // Response interceptor
    this.api.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      (error) => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          return Promise.reject({
            data: error.response.data,
            status: error.response.status,
            success: false,
            message: error.response.data.message || 'An error occurred',
          });
        } else if (error.request) {
          // The request was made but no response was received
          return Promise.reject({
            data: null,
            status: 0,
            success: false,
            message: 'No response from server',
          });
        } else {
          // Something happened in setting up the request that triggered an Error
          return Promise.reject({
            data: null,
            status: 0,
            success: false,
            message: error.message || 'Request failed',
          });
        }
      },
    );
  }

  // Singleton pattern
  public static getInstance(): HttpService {
    if (!HttpService.instance) {
      HttpService.instance = new HttpService();
    }
    return HttpService.instance;
  }

  private async getToken(): Promise<string | null> {
    // Get token from secure storage
    return await secureStorage.getItem(AUTH_TOKEN_KEY);
  }

  // Helper to transform Axios response to our ApiResponse format
  private transformResponse<T>(response: AxiosResponse<T>): ApiResponse<T> {
    return {
      data: response.data,
      status: response.status,
      success: true,
    };
  }

  // HTTP methods
  public async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.api.get<T>(url, config);
    return this.transformResponse(response);
  }

  public async post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> {
    console.log('🚀 ~ HttpService ~ post ~ data:', url);
    const response = await this.api.post<T>(url, data, config);

    return this.transformResponse(response);
  }

  public async put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> {
    const response = await this.api.put<T>(url, data, config);
    return this.transformResponse(response);
  }

  public async patch<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> {
    const response = await this.api.patch<T>(url, data, config);
    return this.transformResponse(response);
  }

  public async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.api.delete<T>(url, config);
    return this.transformResponse(response);
  }
}

// Create a convenient export
const httpService = HttpService.getInstance();

export default httpService;
