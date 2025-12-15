import React from 'react';
import { useGoogleAuth } from '@hooks/useGoogleAuth';
import { PersonIcon } from './icons';

interface AuthButtonProps {
  size?: number;
  className?: string;
}

const AuthButton: React.FC<AuthButtonProps> = ({ size = 40, className = '' }) => {
  const { handleGoogleAuth, isLoading, error } = useGoogleAuth();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    handleGoogleAuth();
  };

  return (
    <div className={`auth-button-container ${className}`}>
      <button
        onClick={handleClick}
        disabled={isLoading}
        className="auth-button"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          borderRadius: '50%',
          backgroundColor: '#287075ff',
          border: 'none',
          cursor: isLoading ? 'not-allowed' : 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 0,
        }}
        title="Авторизация"
      >
        {isLoading ? (
          <div className="spinner" style={{
            width: `${size * 0.5}px`,
            height: `${size * 0.5}px`,
            border: '2px solid white',
            borderTopColor: 'transparent',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }} />
        ) : (
          <PersonIcon className="auth-icon" style={{ color: 'white' }} />
        )}
      </button>
      {error && (
        <div className="auth-error" style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>
          {error}
        </div>
      )}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default AuthButton;