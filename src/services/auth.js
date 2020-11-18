import React, { useState, useEffect } from 'react';
import api from './api.config';

const AuthContext = React.createContext({});

function AuthProvider(props) {
  const [user, setUser] = useState({});

  useEffect(() => {
    const localUser = localStorage.getItem(`@relibre-business:user`);

    if (localUser) {
      setUser(JSON.parse(localUser));
    }
  }, []);

  const login = async ({ login, password }) => {
    const { data, errors } = await api.post('Account/Login', {
      body: {
        login: login,
        password: password,
        platform: 'business'
      }
    });

    if (errors) {
      return { errors };
    }

    if (data && data.result.access_Token) {
      let user = {
        token: data.result.access_Token,
        login: data.result.login,
        name: data.result.name,
        phone: data.result.phone,
        document: data.result.document,
        description: data.result.description || ``,
        legal_name: data.result.legal_Name,
        web_site: data.result.web_site || '',
        addresses: [...data.result.addresses] || null
      };

      // const fullUser = await fetchUser(data.result.token);

      user = {
        ...user
        // ...fullUser
      };

      localStorage.setItem(`@relibre-business:user`, JSON.stringify(user));
      setUser(user);

      return { errors: {} };
    }
  };

  const logout = () => {
    setUser({});
    localStorage.setItem(`@relibre-business:user`, '');
    window.location.href = '/login';
  };

  const register = async payload => {
    const { data, errors } = await api.post(`Account/Register/Business`, {
      body: payload
    });

    if (data) {
      return data;
    }
  };

  const updateUser = async payload => {
    const { data } = await api.put(`Account/Business`, payload);

    const localUser = localStorage.getItem(`@relibre-business:user`);
    if (data && data.result) {
      const user = {
        ...JSON.parse(localUser),
        login: data.result.login,
        name: data.result.name,
        document: data.result.document,
        legal_name: data.result.legal_Name,
        web_site: data.result.web_site || '',
        description: data.result.description || '',
        phone: data.result.phones[0].number,
        addresses: data.result.addresses || null
      };

      localStorage.setItem(`@relibre-business:user`, JSON.stringify(user));

      setUser(user);

      return { data: data.result };
    }
  };

  const fetchUser = async token => {
    const { data } = await api.get(`Account/Business`, {
      auth: true
    });
    if (data && data.result) {
      setUser(state => {
        return { ...state, ...data.result };
      });

      localStorage.setItem(
        `@relibre-business:user`,
        JSON.stringify({ ...user, ...data.result })
      );
      return data.result;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        register,
        user,
        updateUser,
        fetchUser
      }}
      {...props}
    />
  );
}

const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };
