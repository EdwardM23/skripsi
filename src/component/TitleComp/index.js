import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const TitleComp = props => {
  return (
    <View>
      <Text style={styles.titleStyle}>{props.text}</Text>
    </View>
  );
};

export default TitleComp;

const styles = StyleSheet.create({
  titleStyle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0B59B1',
  },
});
