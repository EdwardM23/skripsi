import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {AuthProvider} from './global/AuthContext';
import Navigate from './Navigate';

const App = () => {
  return (
    <AuthProvider>
      <Navigate />
    </AuthProvider>
  );
};

export default App;

const styles = StyleSheet.create({});