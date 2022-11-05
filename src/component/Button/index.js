import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

const Button = props => {
  return (
    <View>
      <TouchableOpacity onPress="">
        <View style={styles.buttonWrap}>
          <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 18}}>
            {props.btnText}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Button;

const styles = StyleSheet.create({
  buttonWrap: {
    backgroundColor: '#FCCC0A',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    width: 325,
  },
});
