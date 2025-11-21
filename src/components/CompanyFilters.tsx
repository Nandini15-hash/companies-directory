import React from 'react';
import { FilterState } from '../types/company';
import { Search, Filter, X } from 'lucide-react';

interface CompanyFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: Partial<FilterState>) => void;
  onClearFilters: () => void;
  availableIndustries: string[];
  availableLocations: string[];
  availableSizes: string[];
}

export const CompanyFilters: React.FC<CompanyFiltersProps> = ({
  filters,
  onFiltersChange,
  onClearFilters,
  availableIndustries,
  availableLocations,
  availableSizes,
}) => {
  const hasActiveFilters = 
    filters.search !== '' || 
    filters.industry !== '' || 
    filters.location !== '' || 
    filters.size !== '';

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFiltersChange({ search: e.target.value });
  };

  const handleIndustryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFiltersChange({ industry: e.target.value });
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFiltersChange({ location: e.target.value });
  };

  const handleSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFiltersChange({ size: e.target.value });
  };

  return (
    <div className="filters-section">
      <div className="filters-header">
        <h2 className="filters-title">
          <Filter size={20} />
          Filters
        </h2>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="clear-filters-btn"
            title="Clear all filters"
          >
            <X size={16} />
            Clear All
          </button>
        )}
      </div>

      <div className="filters-grid">
        {/* Search Input */}
        <div className="filter-group">
          <label htmlFor="search" className="filter-label">
            Search Companies
          </label>
          <div className="search-container">
            <Search className="search-icon" size={16} />
            <input
              id="search"
              type="text"
              value={filters.search}
              onChange={handleSearchChange}
              placeholder="Search by name, industry, or description..."
              className="search-input"
            />
          </div>
        </div>

        {/* Industry Filter */}
        <div className="filter-group">
          <label htmlFor="industry" className="filter-label">
            Industry
          </label>
          <select
            id="industry"
            value={filters.industry}
            onChange={handleIndustryChange}
            className="filter-select"
          >
            <option value="">All Industries</option>
            {availableIndustries.map(industry => (
              <option key={industry} value={industry}>
                {industry}
              </option>
            ))}
          </select>
        </div>

        {/* Location Filter */}
        <div className="filter-group">
          <label htmlFor="location" className="filter-label">
            Location
          </label>
          <select
            id="location"
            value={filters.location}
            onChange={handleLocationChange}
            className="filter-select"
          >
            <option value="">All Locations</option>
            {availableLocations.map(location => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>

        {/* Size Filter */}
        <div className="filter-group">
          <label htmlFor="size" className="filter-label">
            Company Size
          </label>
          <select
            id="size"
            value={filters.size}
            onChange={handleSizeChange}
            className="filter-select"
          >
            <option value="">All Sizes</option>
            {availableSizes.map(size => (
              <option key={size} value={size}>
                {size} employees
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div style={{ 
          marginTop: '15px', 
          padding: '10px 15px', 
          background: '#edf2f7', 
          borderRadius: '8px',
          fontSize: '0.9rem',
          color: '#4a5568'
        }}>
          <strong>Active Filters:</strong>
          {filters.search && ` Search: "${filters.search}"`}
          {filters.industry && ` Industry: ${filters.industry}`}
          {filters.location && ` Location: ${filters.location}`}
          {filters.size && ` Size: ${filters.size}`}
        </div>
      )}
    </div>
  );
};