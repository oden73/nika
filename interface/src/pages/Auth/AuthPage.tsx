import React from 'react';
import { Link } from 'react-router-dom';
import { routes } from '@constants';
import GoogleAuthButton from '@components/Auth/GoogleAuthButton';
import './AuthPage.css';

export const AuthPage = () => {
  return (
    <div className="auth-page-wrapper">
      <div className="auth-center-container">
        {/* Логотип на странице (опционально, можно убрать) */}
        <div className="auth-logo-container">
          <h1 className="auth-logo">NIKA</h1>
        </div>

        {/* Карточка с формой */}
        <div className="auth-card">
          <div className="auth-header">
            <h2 className="auth-title">Вход в систему</h2>
            <p className="auth-subtitle">Выберите способ авторизации</p>
          </div>

          <div className="auth-methods">
            {/* Google авторизация */}
            <div className="auth-method">
              <GoogleAuthButton />
            </div>

            {/* Разделитель */}
            <div className="auth-divider">
              <span className="divider-line"></span>
              <span className="divider-text">или</span>
              <span className="divider-line"></span>
            </div>

            {/* Email авторизация (заглушка) */}
            <div className="auth-method">
              <button className="auth-page-button email-button">
                <div className="auth-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </div>
                <span>Войти через Email</span>
              </button>
            </div>

            {/* GitHub авторизация (заглушка) */}
            <div className="auth-method">
              <button className="auth-page-button github-button">
                <div className="auth-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </div>
                <span>Войти через GitHub</span>
              </button>
            </div>
          </div>

          {/* Кнопка возврата */}
          <div className="auth-footer">
            <Link to={routes.MAIN} className="auth-back-link">
              <span className="back-icon">←</span>
              <span>Вернуться на главную</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};