import React from 'react';
import {StyleSheet, Dimensions, View, Text} from 'react-native';
import Pdf from 'react-native-pdf';

const PDFViewer = () => {
  const source = {
    uri: 'https://res.cloudinary.com/demo/image/upload/example_pdf.pdf',
    cache: true,
  };
  return (
    <View style={styles.container}>
      <Text>Testing</Text>
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
        }}
        onPressLink={uri => {
          console.log(`Link pressed: ${uri}`);
        }}
        style={styles.pdf}
      />
    </View>
  );
};

export default PDFViewer;

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
