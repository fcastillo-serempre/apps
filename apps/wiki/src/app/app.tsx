import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { store, persistor, useAuthStore } from '@apps/store';
import { Button, Typography } from '@apps/ui-library';

import { AppNavigation } from '../router';

export const Login = () => {
  const { handleLogin, status, errorMessage } = useAuthStore();

  return (
    <>
      <Typography variant="h3">Welcome to wiki!</Typography>
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

      <Typography className="text-teal-500 underline" variant="h5">
        {status}
      </Typography>

      {errorMessage && <p>{errorMessage}</p>}
    </>
  );
};

export const Logout = () => {
  const { handleLogout, status, user, errorMessage } = useAuthStore();
  return (
    <>
      <Typography variant="h3">Welcome {user?.name}!</Typography>
      <Button
        variant="outlined"
        onClick={() => {
          handleLogout();
        }}
        disabled={status === 'checking'}
      >
        {status === 'checking' ? 'Checking...' : 'Logout'}
      </Button>

      <Typography className="text-teal-500 underline" variant="h5">
        {status}
      </Typography>

      {errorMessage && <p>{errorMessage}</p>}
    </>
  );
};

export const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <PersistGate loading={<span>Loading...</span>} persistor={persistor}>
          <AppNavigation />
        </PersistGate>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
