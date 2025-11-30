import { call_create_author_agent } from '@api/sc/agents/yandexAuthAgent';
import { useState, useCallback, useEffect } from 'react';

// generate random session
const generateSessionId = (): string => {
  return 'session_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
};

const setCookie = (name: string, value: string, days: number = 7) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
};

export const getCookie = (name: string): string | null => {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

export const useYandexAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    // set session if exists
    const existingSession = getCookie('auth_session');
    if (existingSession) {
      setSessionId(existingSession);
      console.log('Get existing auth session:', existingSession);
    }
  }, []);

  const handleYandexCode = async (code: string) => {
    try {
      const newSessionId = generateSessionId();
      console.log('Generate auth session:', newSessionId);
      setCookie('auth_session', newSessionId, 7);
      setSessionId(newSessionId);
      await call_create_author_agent(code, newSessionId);
    } catch (error) {
      console.error('Get error with auth:', error);
    }
  };

  useEffect(() => {
    // try to find query param "code" in url
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    
    if (code) {      
      handleYandexCode(code);
      window.history.replaceState({}, '', '/');
    }
  }, []);

  const handleYandexAuth = useCallback(() => {
    setIsLoading(true);
    setError(null);

    const clientId = process.env.YANDEX_CLIENT_ID;
    const redirectUri = 'http://localhost:3033/auth/callback';

    const scopes = [
      'login:email',
      'login:info',
      'disk:read',
      // can be added
      // 'disk:write',
      // 'disk.app_folder'
    ];

    const responseType = 'code';

    const authUrl = `https://oauth.yandex.ru/authorize?` +
      `client_id=${clientId}` +
      `&redirect_uri=${encodeURIComponent(redirectUri)}` +
      `&response_type=${responseType}` +
      `&scope=${encodeURIComponent(scopes.join(' '))}`;

    window.location.href = authUrl;
  }, []);

  return {
    handleYandexAuth,
    isLoading,
    error,
  };
};
