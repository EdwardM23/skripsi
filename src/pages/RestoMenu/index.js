import {Alert, Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Pdf from 'react-native-pdf';

const RestoMenu = ({route, navigation}) => {
  console.log('Resto Menu', route.params.passMenu);
  const source = {
    uri: route.params.passMenu,
    cache: true,
  };
  return (
    <View style={styles.container}>
      <Pdf
        trustAllCerts={false}
        source={source}
        onLoadComplete={(numberOfPages, filePath) => {
          console.log(`Number of pages: ${numberOfPages}`);
        }}
        onPageChanged={(page, numberOfPages) => {
          console.log(`Current page: ${page}`);
        }}
        onError={error => {
          console.log(error);
          Alert.alert('Menu currently unavailable');
        }}
        onPressLink={uri => {
          console.log(`Link pressed: ${uri}`);
        }}
        style={styles.pdf}
      />
    </View>
  );
};

export default RestoMenu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
