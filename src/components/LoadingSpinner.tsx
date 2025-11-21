import React from 'react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="loading-container">
      <div className="loading-content">
        <div className="spinner"></div>
        <h2 className="loading-title">Loading Companies Directory</h2>
        <p className="loading-text">Fetching the latest company data...</p>
        <div style={{ 
          marginTop: '20px', 
          padding: '15px', 
          background: 'rgba(255, 255, 255, 0.1)', 
          borderRadius: '10px',
          backdropFilter: 'blur(10px)'
        }}>
          <p style={{ margin: 0, fontSize: '0.9rem' }}>
            <strong>Tip:</strong> Make sure JSON Server is running on port 3001
          </p>
        </div>
      </div>
    </div>
  );
};