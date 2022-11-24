import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
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

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    // <NavigationContainer>
    //   <Stack.Navigator>
    //     <Stack.Screen name="Eatzy" component={LandingPage} />
    //     <Stack.Screen name="Register" component={SignUp} />
    //     <Stack.Screen name="Login" component={Login} />
    //     <Stack.Screen name="Home" component={HomePage} />
    //     <Stack.Screen name="RestoMenu" component={RestoMenu} />
    //     <Stack.Screen name="SignUp" component={SignUp} />
    //     <Stack.Screen name="Login" component={Login} />
    //   </Stack.Navigator>
    // </NavigationContainer>

    <View>
      {/* <PDFViewer /> */}
      {/* <MenuViewer /> */}
      {/* <SplashScreen /> */}
      {/* <LandingPage /> */}
      {/* <HomePage /> */}
      {/* <RestauranList /> */}
      {/* <SignUp /> */}
      {/* <Login /> */}
      <RestoDetail />
      {/* <Profile /> */}
      {/* <AddReview /> */}
      {/* <Filter /> */}
    </View>

  );
};

export default App;

const styles = StyleSheet.create({});

// import * as React from 'react';
// import { View, Text } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';

// function HomeScreen() {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text>Home Screen</Text>
//     </View>
//   );
// }

// const Stack = createNativeStackNavigator();

// function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen name="Home" component={HomeScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// export default App;
