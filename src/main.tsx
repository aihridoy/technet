import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import routes from './routes/routes.tsx';
import { Provider } from 'react-redux';
import { store } from './redux/store.ts';
import AuthListener from './AuthListener.tsx';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthListener>
        <RouterProvider router={routes} />
      </AuthListener>
    </Provider>
  </React.StrictMode>
);
