import * as Keychain from 'react-native-keychain';
import React, {createContext, useEffect, useState} from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userDetails, setUserDetails] = useState({});

  const handleLogin = async (token, username, email) => {
    setIsLoggedIn(true);
    console.log('Handle Login : ', username, token, email);
    await Keychain.setGenericPassword(username, token, email);
    setUserDetails({token, username, email});
  };

  const checkCredential = async () => {
    try {
      const credentials = await Keychain.getGenericPassword();
      if (credentials) {
        setIsLoggedIn(true);
        setUserDetails(credentials);
        console.log('>>>> Hasil Credential >>>>', isLoggedIn, userDetails);
      } else {
        setIsLoggedIn(false);
        console.log(isLoggedIn);
        console.log('No credentials stored');
      }
    } catch (error) {
      console.log("Keychain couldn't be accessed!", error);
    }
  };

  const handleLogout = async () => {
    const logout = await Keychain.resetGenericPassword();
    console.log({logout});
    if (logout) {
      setIsLoggedIn(false);
      setUserDetails({});
    }
  };

  useEffect(() => {
    checkCredential();
    // handleLogout();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        userDetails,
        handleLogin,
        handleLogout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
