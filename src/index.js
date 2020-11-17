import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
// import { createBrowserHistory } from 'history';
import { Route, Switch, Redirect, BrowserRouter } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Modal from 'components/Dialogs/LocationNotAllowed';
import AlertProvider, { alertOptions, AlertTemplate } from 'components/Alert';

import 'assets/scss/material-kit-react.scss?v=1.4.0';

import AdminLayout from 'views/Admin';
import Login from 'views/LoginPage';
import HomePage from 'views/HomePage/HomePage';
import RegisterPage from 'views/RegisterPage';
//import ResultPage from 'views/ResultPage';
import Emprestimo from 'views/ResultPages/Emprestimo';
import Troca from 'views/ResultPages/Troca';
import Doacao from 'views/ResultPages/Doacao';
import Venda from 'views/ResultPages/Venda';
import Comerciante from 'views/ResultPages/Comerciante';
import CompanyProfile from 'views/CompanyProfilePage';
import ChangePassword from 'views/ChangePassword';
import ForgetPassword from 'views/ForgetPassword';
import Terms from 'views/Terms';
import { PrivateRoute } from 'components/PrivateRoute.js';
import { useAuth } from 'services/auth';

import { dashRoutes } from 'views/routes.js';

import Provider from 'services/contexts';
//import axios from 'axios';

// let hist = createBrowserHistory();

const cookies = new Cookies();

//axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
// axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const App = () => {
  const getRoutes = () => {
    return dashRoutes.map((prop, key) => {
      if (prop.layout === '/app') {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };

  const [redirect, setRedirect] = useState(false);
  const { logout } = useAuth();

  useEffect(() => {
    function handleUserLocalData(event) {
      if (event.key === '@relibre-business:user' && event.newValue === '') {
        logout();
        setRedirect(true);
      }
    }

    function createEvent() {
      window.addEventListener('storage', handleUserLocalData);
    }

    createEvent();
  }, []);

  return (
    <>
      {/* <Suspense fallback={<div />}> */}
      <BrowserRouter>
        <Switch>
          <Route path="/home" component={HomePage} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/termos" component={Terms} />
          <Route path="/change-password" component={ChangePassword} />
          <Route path="/forget-password" component={ForgetPassword} />

          <PrivateRoute redirect={redirect}>
            <AdminLayout>{getRoutes(dashRoutes)}</AdminLayout>
          </PrivateRoute>
        </Switch>
      </BrowserRouter>
      {/* </Suspense> */}
    </>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <AlertProvider template={AlertTemplate} {...alertOptions}>
      <Provider>
        <App />
      </Provider>
    </AlertProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
