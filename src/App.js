import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SplashScreen from './pages/SplashScreen';
import LendingPage from './pages/LendingPage';

const App = () => {
  return (
    <View>
      {/* <SplashScreen /> */}
      <LendingPage />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({});
