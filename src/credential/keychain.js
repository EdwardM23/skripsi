import * as Keychain from 'react-native-keychain';
// import React, {useEffect, useState} from 'react';

// const keychain = () => {
export let isLoggedIn = false;
export let userDetails = {};

export const checkCredential = async () => {
  try {
    const credentials = await Keychain.getGenericPassword();
    if (credentials) {
      isLoggedIn = true;
      userDetails = credentials;
      console.log('>>>> Hasil Credential >>>>', isLoggedIn, userDetails);
    } else {
      console.log('No credentials stored');
    }
  } catch (error) {
    console.log("Keychain couldn't be accessed!", error);
  }
};

export const handleLogin = async (token, username) => {
  // login api call here
  console.log('Handle Login : ', username, token);
  await Keychain.setGenericPassword(username, token);
  isLoggedIn = true;
  userDetails = {token, username};
};

export const handleLogout = async () => {
  const logout = await Keychain.resetGenericPassword();
  console.log({logout});
  if (logout) {
    isLoggedIn = false;
    userDetails = {};
  }
};
// };

// export default keychain;
