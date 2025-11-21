import React from 'react';
import { useCompanies } from './hooks/useCompanies';
import { CompanyFilters } from './components/CompanyFilters';
import { CompanyCard } from './components/CompanyCard';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import { LayoutGrid, Table, Building2 } from 'lucide-react';

function App() {
  const {
    companies,
    loading,
    error,
    filters,
    updateFilters,
    clearFilters,
    refetch,
    availableIndustries,
    availableLocations,
    availableSizes,
    usingMockData
  } = useCompanies();

  const [viewMode, setViewMode] = React.useState<'card' | 'table'>('card');

  // Show loading state
  if (loading) return <LoadingSpinner />;
  
  // Show error state
  if (error) return <ErrorMessage message={error} onRetry={refetch} />;

  return (
    <div className="app-container">
      {/* Header */}
      <div className="header">
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
          <Building2 size={48} style={{ color: 'white' }} />
        </div>
        <h1>Companies Directory</h1>
        <p>Discover and filter through our network of companies</p>
        {usingMockData && (
          <div style={{ 
            background: 'rgba(255, 255, 255, 0.2)', 
            padding: '10px 20px', 
            borderRadius: '10px', 
            marginTop: '15px',
            backdropFilter: 'blur(10px)'
          }}>
            <strong>Demo Mode:</strong> Using sample data. Run <code>npm run server</code> for live API.
          </div>
        )}
      </div>

      {/* Filters Section */}
      <CompanyFilters
        filters={filters}
        onFiltersChange={updateFilters}
        onClearFilters={clearFilters}
        availableIndustries={availableIndustries}
        availableLocations={availableLocations}
        availableSizes={availableSizes}
      />

      {/* Results Header */}
      <div className="view-toggle">
        <div className="results-info">
          Showing {companies.length} of {companies.length} companies
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={() => setViewMode('card')}
            className={`view-btn ${viewMode === 'card' ? 'active' : ''}`}
            title="Card View"
          >
            <LayoutGrid size={20} />
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={`view-btn ${viewMode === 'table' ? 'active' : ''}`}
            title="Table View"
          >
            <Table size={20} />
          </button>
        </div>
      </div>

      {/* Companies Grid */}
      {viewMode === 'card' && (
        <div className="companies-grid">
          {companies.map(company => (
            <CompanyCard key={company.id} company={company} />
          ))}
        </div>
      )}

      {/* Empty State */}
      {companies.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">🏢</div>
          <h3>No companies found</h3>
          <p>Try adjusting your filters to see more results</p>
          <button
            onClick={clearFilters}
            className="try-again-btn"
          >
            Clear All Filters
          </button>
        </div>
      )}

      {/* Demo Info Footer */}
      {usingMockData && (
        <div style={{ 
          textAlign: 'center', 
          color: 'white', 
          marginTop: '40px',
          padding: '20px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '10px',
          backdropFilter: 'blur(10px)'
        }}>
          <h4>🚀 Getting Started</h4>
          <p>To connect to a live API, open a new terminal and run:</p>
          <code style={{ 
            background: 'rgba(0, 0, 0, 0.3)', 
            padding: '10px 15px', 
            borderRadius: '5px',
            display: 'inline-block',
            margin: '10px 0'
          }}>
            npm run server
          </code>
          <p>Then refresh this page to see real API data!</p>
        </div>
      )}
    </div>
  );
}

export default App;