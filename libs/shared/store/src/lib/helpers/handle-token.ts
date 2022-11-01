export type Token = string;

interface HandleToken {
  saveToken: (token: Token) => void;
  getToken: () => string | null;
  removeToken: () => void;
}

export const handleToken = (): HandleToken => {
  const tokenKey = 'token';
  const tokenKeyExp = 'token-init-date';

  return {
    saveToken: (token: Token) => {
      if (token) {
        localStorage.setItem(tokenKey, token);
        localStorage.setItem(tokenKeyExp, new Date().getTime().toString());
      }
    },
    getToken: () => localStorage.getItem(tokenKey),
    removeToken: () => {
      localStorage.removeItem(tokenKey);
      localStorage.removeItem(tokenKeyExp);
    },
  };
};
