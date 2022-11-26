import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';

const FormInput = props => {
  const {placeholder, label} = props;
  return (
    <View>
      <Text style={{fontSize: 18, color: '#353535'}}>{label}</Text>
      <TextInput {...props} placeholder={placeholder} />
    </View>
  );
};

export default FormInput;

const styles = StyleSheet.create({});
