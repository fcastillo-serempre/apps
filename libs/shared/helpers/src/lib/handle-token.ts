export type Token = string;

interface HandleToken {
  set: (token: Token) => void;
  get: () => string | null;
  remove: () => void;
}

export const handleToken = (): HandleToken => {
  const tokenKey = 'token';
  const tokenKeyExp = 'token-init-date';

  return {
    set: (token: Token) => {
      if (token) {
        localStorage.setItem(tokenKey, token);
        localStorage.setItem(tokenKeyExp, new Date().getTime().toString());
      }
    },
    get: () => localStorage.getItem(tokenKey),
    remove: () => {
      localStorage.removeItem(tokenKey);
      localStorage.removeItem(tokenKeyExp);
    },
  };
};
