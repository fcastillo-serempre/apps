import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { store, persistor, useAuthStore } from '@apps/store';
import { Avatar, Button, Typography } from '@apps/ui-library';

import { AppNavigation } from '../router';

export const Logout = () => {
  const { handleLogout, status, user, errorMessage } = useAuthStore();
  return (
    <>
      {user && (
        <div className="flex items-center p-4 mb-4 border rounded-xl gap-x-3 border-slate-100">
          <Avatar src={user.photoURL} alt={user.name} />
          <div>
            <Typography variant="h6" className="font-bold">
              {user.name}
            </Typography>
            <Typography variant="body2" className="text-sm">
              {user.email}
            </Typography>
          </div>
        </div>
      )}

      <Button
        color="failure"
        onClick={() => {
          handleLogout();
        }}
        disabled={status === 'checking'}
      >
        {status === 'checking' ? 'Checking...' : 'Logout'}
      </Button>

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
