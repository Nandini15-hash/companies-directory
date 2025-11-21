import React from 'react';
import { AlertCircle, RefreshCw, Server, WifiOff } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onRetry: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  const isConnectionError = message.includes('connect') || message.includes('server');
  const isNotFoundError = message.includes('not found') || message.includes('404');

  return (
    <div className="error-container">
      <div className="error-content">
        {isConnectionError ? (
          <WifiOff className="error-icon" />
        ) : isNotFoundError ? (
          <Server className="error-icon" />
        ) : (
          <AlertCircle className="error-icon" />
        )}
        
        <h2 className="error-title">
          {isConnectionError ? 'Connection Error' : 
           isNotFoundError ? 'Server Not Found' : 'Error Loading Data'}
        </h2>
        
        <p className="error-message">{message}</p>
        
        <button
          onClick={onRetry}
          className="retry-button"
        >
          <RefreshCw size={16} />
          Try Again
        </button>

        <div className="error-help">
          <p><strong>Troubleshooting steps:</strong></p>
          <ul style={{ textAlign: 'left', margin: '15px 0', paddingLeft: '20px' }}>
            <li>Make sure JSON Server is running: <code className="code-snippet">npm run server</code></li>
            <li>Check that port 3001 is available</li>
            <li>Verify your internet connection</li>
            <li>Try refreshing the page</li>
          </ul>
          <p>The app will use demo data if the server is unavailable.</p>
        </div>
      </div>
    </div>
  );
};