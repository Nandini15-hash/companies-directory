import axios from 'axios';
import { Company } from '../types/company';

const API_BASE_URL = 'http://localhost:3001';

// Create axios instance with configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 second timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log(`🚀 Making API request to: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('❌ API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    console.log(`✅ API Response received: ${response.status}`);
    return response;
  },
  (error) => {
    console.error('❌ API Response Error:', {
      message: error.message,
      code: error.code,
      status: error.response?.status,
      url: error.config?.url
    });

    // Handle different types of errors
    if (error.code === 'ECONNREFUSED') {
      throw new Error('Cannot connect to server. Please make sure JSON Server is running on port 3001.');
    }
    
    if (error.response?.status === 404) {
      throw new Error('API endpoint not found. Please check the server configuration.');
    }
    
    if (error.response?.status >= 500) {
      throw new Error('Server error. Please try again later.');
    }
    
    if (error.message.includes('timeout')) {
      throw new Error('Request timeout. Server is taking too long to respond.');
    }

    throw new Error(error.message || 'Failed to connect to server');
  }
);

export const companyService = {
  /**
   * Get all companies
   */
  async getCompanies(): Promise<Company[]> {
    try {
      console.log('📡 Fetching companies from API...');
      const response = await api.get<Company[]>('/companies');
      console.log(`✅ Successfully fetched ${response.data.length} companies`);
      return response.data;
    } catch (error: any) {
      console.error('❌ Error in getCompanies:', error.message);
      throw error; // Re-throw to let the hook handle it
    }
  },

  /**
   * Get a single company by ID
   */
  async getCompany(id: string): Promise<Company> {
    try {
      console.log(`📡 Fetching company ${id} from API...`);
      const response = await api.get<Company>(`/companies/${id}`);
      console.log(`✅ Successfully fetched company: ${response.data.name}`);
      return response.data;
    } catch (error: any) {
      console.error(`❌ Error fetching company ${id}:`, error.message);
      throw error;
    }
  },

  /**
   * Search companies by query
   */
  async searchCompanies(query: string): Promise<Company[]> {
    try {
      console.log(`🔍 Searching companies with query: "${query}"`);
      const response = await api.get<Company[]>(`/companies?q=${encodeURIComponent(query)}`);
      console.log(`✅ Search found ${response.data.length} companies`);
      return response.data;
    } catch (error: any) {
      console.error('❌ Error searching companies:', error.message);
      throw error;
    }
  }
};

// Test connection function
export const testAPIConnection = async (): Promise<boolean> => {
  try {
    await api.get('/companies');
    console.log('✅ API connection test: SUCCESS');
    return true;
  } catch (error) {
    console.log('❌ API connection test: FAILED');
    return false;
  }
};