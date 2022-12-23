import * as Keychain from 'react-native-keychain';
import React, {createContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const [filter, setFilter] = useState([]);

  const storeData = async (token, username, email) => {
    try {
      const jsonValue = JSON.stringify({
        token: token,
        username: username,
        email: email,
      });
      await AsyncStorage.setItem('@storage_Key', jsonValue);
      setUserDetails({token, username, email});
    } catch (e) {}
  };

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@storage_Key');
      if (jsonValue != null) {
        setIsLoggedIn(true);
        console.log(JSON.parse(jsonValue));
        setUserDetails(JSON.parse(jsonValue));
        console.log('USER DETAILS', userDetails);
      } else {
      }
      J;
    } catch (e) {}
  };

  const clearAll = async () => {
    try {
      await AsyncStorage.clear();
    } catch (e) {}
  };

  const handleLogin = async (token, username, email) => {
    setIsLoggedIn(true);
    storeData(token, username, email);
    console.log('Handle Login : ', username, token, email);
    await Keychain.setGenericPassword(username, token, email);
    // setUserDetails({token, username, email});
  };

  // const checkCredential = async () => {
  //   try {
  //     const credentials = await Keychain.getGenericPassword();
  //     if (credentials) {
  //       setIsLoggedIn(true);
  //       setUserDetails(credentials);
  //       console.log('>>>> Hasil Credential >>>>', isLoggedIn, userDetails);
  //     } else {
  //       setIsLoggedIn(false);
  //       console.log(isLoggedIn);
  //       console.log('No credentials stored');
  //     }
  //   } catch (error) {
  //     console.log("Keychain couldn't be accessed!", error);
  //   }
  // };

  const handleLogout = async () => {
    const logout = await Keychain.resetGenericPassword();
    console.log({logout});
    if (logout) {
      setIsLoggedIn(false);
      clearAll();
      console.log('Log Out Succes');
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        userDetails,
        filter,
        setFilter,
        handleLogin,
        handleLogout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
