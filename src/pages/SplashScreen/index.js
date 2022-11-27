import {StyleSheet, Text, View} from 'react-native';
import React, { useEffect } from 'react';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Eatzy')
    }, 1000)
  }, [navigation]);
  return (
    <View style={styles.wrapper}>
      <Text style={styles.textTitleEatzy}>Eatzy</Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  wrapper: {
    padding: 30,
    display: 'flex',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  textTitleEatzy: {
    textAlign: 'center',
    fontSize: 40,
    color: '#0B59B1',
    fontWeight: 'bold',
  },
  titleSection: {
    marginTop: 20,
  },
});
