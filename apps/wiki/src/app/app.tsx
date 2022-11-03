import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { store, persistor } from '@apps/store';

import { AppNavigation } from '../router';

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
