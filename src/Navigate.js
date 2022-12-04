import {StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import SplashScreen from './pages/SplashScreen';
import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';
import RestauranList from './pages/RestaurantList';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import RestoDetail from './pages/RestoDetail';
import Profile from './pages/Profile';
import AddReview from './pages/AddReview';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import PDFViewer from './pages/PDFViewer';
import RestoMenu from './pages/RestoMenu';
import Filter from './pages/Filter';
import {AuthContext} from './global/AuthContext';
import Testing from './pages/TESTINGAJA';

const Stack = createNativeStackNavigator();

const Navigate = () => {
  const {isLoggedIn} = useContext(AuthContext);
  console.log('IS LOGI IN', isLoggedIn);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoggedIn == false ? (
          <>
            <Stack.Screen name="Home" component={HomePage} />
            <Stack.Screen name="RestauranList" component={RestauranList} />
            <Stack.Screen name="RestoDetail" component={RestoDetail} />
            {/* <Stack.Screen name="Splash" component={SplashScreen} options={{headerShown: false}} />
          <Stack.Screen name="Eatzy" component={LandingPage} options={{headerShown: false}} />
          <Stack.Screen name="Register" component={SignUp} options={{headerShown: false}}/>
          <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/> */}
          </>
        ) : (
          <>
            <Stack.Screen name="Home" component={HomePage} />
            {/* <Stack.Screen name="RestoMenu" component={RestoMenu} /> */}
            {/* <Stack.Screen name="SignUp" component={SignUp} /> */}
            {/* <Stack.Screen name="Login" component={Login} /> */}
            {/* <Stack.Screen name="RestauranList" component={RestauranList} /> */}
            {/* <Stack.Screen name="RestoDetail" component={RestoDetail} /> */}
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigate;

const styles = StyleSheet.create({});
