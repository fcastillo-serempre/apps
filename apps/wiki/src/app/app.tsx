import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';

import { store, persistor, useAuthStore } from '@apps/store';
import { useEffect } from 'react';
import { Button, Typography } from '@apps/ui-library';

const Login = () => {
  const {
    handleLogin,
    handleLogout,
    status,
    user,
    errorMessage,
    handleCheckToken,
  } = useAuthStore();

  useEffect(() => {
    handleCheckToken();
  }, []);

  return (
    <div style={{ textAlign: 'center' }}>
      <Typography variant="h3">Welcome to wiki!</Typography>

      {!user ? (
        <Button
          onClick={() => {
            handleLogin({
              password: '123456',
              email: 'fcastillo@serempre.com',
            });
          }}
          disabled={status === 'checking'}
        >
          {status === 'checking' ? 'Checking...' : 'Login'}
        </Button>
      ) : (
        <Button
          variant="outlined"
          onClick={() => {
            handleLogout();
          }}
          disabled={status === 'checking'}
        >
          {status === 'checking' ? 'Checking...' : 'Logout'}
        </Button>
      )}

      <Typography className="text-teal-500 underline" variant="h5">
        {status}
      </Typography>
      {user && <p>{JSON.stringify(user, null, 2)}</p>}

      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<span>Loading...</span>} persistor={persistor}>
        <Login />
      </PersistGate>
    </Provider>
  );
};

export default App;
