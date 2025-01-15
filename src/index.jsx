import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx'; 
import { Provider } from 'react-redux'
import  store from'./store.jsx'
import { BrowserRouter } from 'react-router-dom'
import { UserProvider } from './Component/CreateContext/CreateContext.js';
import ScrollToTop from './ScrollToTop.jsx';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <Provider store={store}>
    <UserProvider>
      <BrowserRouter>
       <ScrollToTop />
        <App />
      </BrowserRouter>
    </UserProvider>
  </Provider>
</React.StrictMode>
);

 
 
