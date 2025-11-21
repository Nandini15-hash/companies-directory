import { useState, useEffect } from 'react';
import { Company, FilterState } from '../types/company';
import { companyService } from '../services/api';

// Mock data as fallback
const mockCompanies: Company[] = [
  {
    id: "1",
    name: "TechCorp Solutions",
    industry: "Technology",
    location: "San Francisco",
    size: "1000-5000",
    founded: 2010,
    description: "Leading provider of enterprise software solutions and cloud infrastructure services for global businesses.",
    website: "https://techcorp.com",
    email: "contact@techcorp.com"
  },
  {
    id: "2",
    name: "GreenEnergy Inc",
    industry: "Energy",
    location: "Austin",
    size: "500-1000",
    founded: 2015,
    description: "Renewable energy solutions provider focused on solar and wind power for sustainable future.",
    website: "https://greenenergy.com",
    email: "info@greenenergy.com"
  },
  {
    id: "3",
    name: "HealthPlus Medical",
    industry: "Healthcare",
    location: "Boston",
    size: "5000+",
    founded: 2005,
    description: "Comprehensive healthcare services and advanced medical technology solutions.",
    website: "https://healthplus.com",
    email: "support@healthplus.com"
  },
  {
    id: "4",
    name: "EduTech Innovations",
    industry: "Education",
    location: "New York",
    size: "100-500",
    founded: 2018,
    description: "Revolutionizing education through innovative technology platforms and learning solutions.",
    website: "https://edutech.com",
    email: "hello@edutech.com"
  },
  {
    id: "5",
    name: "FinSecure Bank",
    industry: "Finance",
    location: "Chicago",
    size: "5000+",
    founded: 1995,
    description: "Trusted financial services and secure banking solutions for individuals and businesses.",
    website: "https://finsecure.com",
    email: "service@finsecure.com"
  },
  {
    id: "6",
    name: "LogiMove Transport",
    industry: "Logistics",
    location: "Miami",
    size: "1000-5000",
    founded: 2012,
    description: "Efficient logistics and transportation services with global supply chain management.",
    website: "https://logimove.com",
    email: "shipping@logimove.com"
  }
];

export const useCompanies = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [filteredCompanies, setFilteredCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    industry: '',
    location: '',
    size: '',
  });
  const [usingMockData, setUsingMockData] = useState(false);

  // Load companies on component mount
  useEffect(() => {
    loadCompanies();
  }, []);

  // Filter companies whenever companies or filters change
  useEffect(() => {
    filterCompanies();
  }, [companies, filters]);

  /**
   * Load companies from API with fallback to mock data
   */
  const loadCompanies = async () => {
    try {
      setLoading(true);
      setError(null);
      setUsingMockData(false);
      
      console.log('Attempting to load companies from API...');
      
      // Try to fetch from API first
      const data = await companyService.getCompanies();
      setCompanies(data);
      console.log('✅ Successfully loaded companies from API:', data.length);
      
    } catch (err) {
      console.warn('❌ API failed, using mock data instead');
      console.error('API Error:', err);
      
      // If API fails, use mock data
      setCompanies(mockCompanies);
      setUsingMockData(true);
      setError('Connected to demo data. To use live API, run: npm run server');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Filter companies based on current filters
   */
  const filterCompanies = () => {
    console.log('🔍 Filtering companies...', {
      totalCompanies: companies.length,
      currentFilters: filters
    });

    const filtered = companies.filter(company => {
      // Search filter - matches name, description, or industry
      const matchesSearch = 
        filters.search === '' ||
        company.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        company.description.toLowerCase().includes(filters.search.toLowerCase()) ||
        company.industry.toLowerCase().includes(filters.search.toLowerCase());

      // Industry filter
      const matchesIndustry = !filters.industry || company.industry === filters.industry;

      // Location filter
      const matchesLocation = !filters.location || company.location === filters.location;

      // Size filter
      const matchesSize = !filters.size || company.size === filters.size;

      const isMatch = matchesSearch && matchesIndustry && matchesLocation && matchesSize;
      
      if (isMatch) {
        console.log('✅ Company matches filters:', company.name);
      }

      return isMatch;
    });

    console.log('📊 Filter results:', {
      before: companies.length,
      after: filtered.length,
      filters: filters
    });

    setFilteredCompanies(filtered);
  };

  /**
   * Update one or more filters
   */
  const updateFilters = (newFilters: Partial<FilterState>) => {
    console.log('🔄 Updating filters:', { from: filters, to: newFilters });
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  /**
   * Clear all filters
   */
  const clearFilters = () => {
    console.log('🧹 Clearing all filters');
    setFilters({
      search: '',
      industry: '',
      location: '',
      size: '',
    });
  };

  /**
   * Get unique values for filter options
   */
  const getUniqueIndustries = (): string[] => {
    const industries = [...new Set(companies.map(company => company.industry))];
    return industries.sort();
  };

  const getUniqueLocations = (): string[] => {
    const locations = [...new Set(companies.map(company => company.location))];
    return locations.sort();
  };

  const getUniqueSizes = (): string[] => {
    const sizes = [...new Set(companies.map(company => company.size))];
    return sizes.sort();
  };

  /**
   * Check if any filters are active
   */
  const hasActiveFilters = (): boolean => {
    return Object.values(filters).some(value => value !== '');
  };

  /**
   * Get filter summary for display
   */
  const getFilterSummary = (): string => {
    const activeFilters = Object.entries(filters)
      .filter(([_, value]) => value !== '')
      .map(([key, value]) => `${key}: ${value}`)
      .join(', ');

    return activeFilters || 'No active filters';
  };

  // Return the hook API
  return {
    // Data
    companies: filteredCompanies,
    allCompanies: companies,
    
    // State
    loading,
    error,
    filters,
    usingMockData,
    
    // Filter utilities
    updateFilters,
    clearFilters,
    hasActiveFilters: hasActiveFilters(),
    filterSummary: getFilterSummary(),
    
    // Data utilities
    refetch: loadCompanies,
    
    // Option values for filters
    availableIndustries: getUniqueIndustries(),
    availableLocations: getUniqueLocations(),
    availableSizes: getUniqueSizes(),
    
    // Statistics
    totalCompanies: companies.length,
    filteredCount: filteredCompanies.length,
    
    // Debug info
    debug: {
      originalCount: companies.length,
      filteredCount: filteredCompanies.length,
      activeFilters: filters,
      usingMockData
    }
  };
};

// Export mock data for testing
export { mockCompanies };