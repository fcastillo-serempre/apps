import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';

import { store, persistor, useAuthStore } from '@apps/store';
import { useEffect } from 'react';

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
      <h1>Welcome to wiki!</h1>

      <button
        onClick={() => {
          handleLogin({
            password: '123456',
            email: 'fcastillo@serempre.com',
          });
        }}
      >
        Login
      </button>
      <br />
      <button
        onClick={() => {
          handleLogout();
        }}
      >
        Logout
      </button>
      <br />

      <h3>
        <u>{status}</u>
      </h3>
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
