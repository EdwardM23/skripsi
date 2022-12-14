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
import AllReviews from './pages/AllReview';
import RestaurantListFiltered from './pages/RestaurantListFiltered';
import History from './pages/History';

const Stack = createNativeStackNavigator();

const Navigate = () => {
  const {isLoggedIn} = useContext(AuthContext);
  console.log('IS LOGI IN', isLoggedIn);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoggedIn == false ? (
          <>
            {/* <Stack.Screen name="Home" component={HomePage} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="RestauranList" component={RestauranList} />
            <Stack.Screen name="RestoDetail" component={RestoDetail} />
            <Stack.Screen
              name="RestaurantListFiltered"
              component={RestaurantListFiltered}
            />
            <Stack.Screen name="Filter" component={Filter} /> */}
            <Stack.Screen
              name="Splash"
              component={SplashScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Eatzy"
              component={LandingPage}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Register"
              component={SignUp}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{headerShown: false}}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Home"
              component={HomePage}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Profile"
              component={Profile}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="RestauranList"
              component={RestauranList}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Filter"
              component={Filter}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="History"
              component={History}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="RestaurantListFiltered"
              component={RestaurantListFiltered}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="RestoDetail"
              component={RestoDetail}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="RestoMenu"
              component={RestoMenu}
              options={{headerShown: false}}
            />
            <Stack.Screen name="AddReview" component={AddReview} />
            <Stack.Screen name="AllReviews" component={AllReviews} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigate;

const styles = StyleSheet.create({});
