import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx'; 
import { Provider } from 'react-redux'
import  store from'./store.jsx'
import { BrowserRouter } from 'react-router-dom'
import { UserProvider } from './Component/CreateContext/CreateContext.js';
import ScrollToTop from './ScrollToTop.jsx';
import { ToastContainer } from 'react-toastify';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <Provider store={store}>
    <UserProvider>
      <BrowserRouter>
       <ScrollToTop />
        <App />
        <ToastContainer 
         position="top-center"
        //  limit={3}
        theme="colored"
       className={"ttc"}
         autoClose={1500}/> 
      </BrowserRouter>
    </UserProvider>
  </Provider>
</React.StrictMode>
);

 
 
