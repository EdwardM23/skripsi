import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import cover from '../../images/cover.png';
import Button from '../../component/Button';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const LendingPage = ({navigation}) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.imageContainer}>
        <Image source={cover} style={{width: '100%'}} />
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.textTitleEatzy}>Eatzy</Text>
      </View>
      <View style={styles.btnContainer}>
        <Button
          btnText="Create Account"
          onBtnPress={() => navigation.navigate('Register')}
        />
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.alreadyHave}>I already have account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LendingPage;

const styles = StyleSheet.create({
  wrapper: {
    padding: 0,
    display: 'flex',
    height: '100%',
    backgroundColor: '#ffffff',
  },
  textTitleEatzy: {
    textAlign: 'center',
    fontSize: 40,
    color: '#0B59B1',
    fontWeight: 'bold',
  },
  imageContainer: {
    flex: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  titleContainer: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  alreadyHave: {
    textAlign: 'center',
    fontSize: 18,
    marginTop: 15,
    color: '#353535',
  },
});
