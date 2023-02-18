import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { GithubProvider } from './context/context';
import { Auth0Provider } from '@auth0/auth0-react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Auth0Provider
    domain='dev-bjtfg3031vtztwqx.us.auth0.com'
    clientId='zj1kgv2hKLQRfP9o9Vyj8ywDOelwpRS1'
    authorizationParams={{
      redirect_uri: window.location.origin,
      
    }}
    cacheLocation="localstorage"
  >
    <GithubProvider>
      <App />
    </GithubProvider>
  </Auth0Provider>
);

serviceWorker.unregister();
