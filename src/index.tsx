import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Provider as ReduxProvider} from 'react-redux';

import store from './redux/store.js';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import {HomePage} from './pages/HomePage';
import {NewsPage} from './pages/NewsPage';
import {ProfilePage} from './pages/ProfilePage';
import {AuthPage} from './pages/AuthPage';
import {ErrorPage} from './pages/ErrorPage';

import './i18n.js';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/news",
    element: <NewsPage />
  },
  {
    path: '/profile',
    element: <ProfilePage />
  },
  {
    path: '/auth',
    element: <AuthPage />
  }
]);

ReactDOM.render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <RouterProvider router={router} />
    </ReduxProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
