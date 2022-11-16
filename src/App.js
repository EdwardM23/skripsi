import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SplashScreen from './pages/SplashScreen';
import LendingPage from './pages/LendingPage';
import HomePage from './pages/HomePage';
import RestauranList from './pages/RestaurantList';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import RestoDetail from './pages/RestoDetail';
import Profile from './pages/Profile';
import AddReview from './pages/AddReview';

const App = () => {
  return (
    <View>
      {/* <SplashScreen /> */}
      {/* <LendingPage /> */}
      {/* <HomePage /> */}
      {/* <RestauranList /> */}
      {/* <SignUp /> */}
      {/* <Login /> */}
      {/* <RestoDetail /> */}
      {/* <Profile /> */}
      <AddReview />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({});
