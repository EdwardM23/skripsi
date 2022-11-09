import {Image, StyleSheet, Text, TouchableOpacity, View, TextInput} from 'react-native';
import React, {useState} from 'react';
import smallCover from '../../images/smallCover.png';
import Button from '../../component/Button';

const Login = () => {
    const [value, setValue] = useState('');
    return (
       <View style={styles.wrapper}>
          <View style={styles.imageContainer}>
             <Image source={smallCover} style={{width: '100%'}} />
          </View>
 
          <View style={styles.titleContainer}>
             <Text style={styles.textTitleLogin}>Login</Text>      
          </View>
 
          <View style={styles.formContainer}>
             <View style={styles.formStyle}>
                <Text style={styles.borderTitle}>Email</Text>
                <TextInput
                    value={value}
                    style={styles.input}
                    inputStyle={styles.inputStyle}
                    labelStyle={styles.labelStyle}
                    placeholderStyle={styles.placeholderStyle}
                    textErrorStyle={styles.textErrorStyle}
                    label="TextInput"
                    placeholderTextColor="gray"
                    onChangeText={text => {setValue(text);}}
                />
             </View>
 
             <View style={styles.formStyle}>
                <Text style={styles.borderTitle}>Password</Text>
                <TextInput
                    value={value}
                    style={styles.input}
                    inputStyle={styles.inputStyle}
                    labelStyle={styles.labelStyle}
                    placeholderStyle={styles.placeholderStyle}
                    textErrorStyle={styles.textErrorStyle}
                    label="TextInput"
                    placeholderTextColor="gray"
                    onChangeText={text => {setValue(text);}}
                />
             </View> 
          </View>
 
          <View style={styles.btnContainer}>
             <Button btnText="Login" />
             <TouchableOpacity onPress="">
                <Text style={{textAlign: 'center', fontSize: 18, marginTop: 15, color: '#353535'}}>
                    Don't have account?
                  <Text style={{textAlign: 'center', fontSize: 18, marginTop: 15, fontWeight: '600', color: '#0B59B1'}}> Register</Text>
               </Text>
             </TouchableOpacity>
          </View>
        </View>
    );
  };
 
 export default Login;
 
 const styles = StyleSheet.create({
    wrapper: {
       padding: 0,
       display: 'flex',
       height: '100%',
       backgroundColor: '#ffffff',
     },
 
    imageContainer: {
       flex: 3,
       alignItems: 'center',
       justifyContent: 'center',
       width: '100%',
       height: '100%',
    },
 
    titleContainer: {
       flex: 1,
       alignItems: 'flex-start',
       justifyContent: 'flex-start',
    },
 
    formContainer: {
       flex: 4,
       alignItems: 'flex-start',
       justifyContent: 'flex-start',
       marginTop: -30,
       marginBottom: 10
    },
 
    btnContainer: {
       flex: 2,
       alignItems: 'center',
       justifyContent: 'center',
     },
 
    input: {
       margin: 15,
       height: 40,
       width: 350,
       borderColor: '#353535',
       borderWidth: 1,
       borderRadius: 15,
       marginLeft: 30,
       marginTop: 10
    },
 
    textTitleLogin: {
       textAlign: 'center',
       fontSize: 24,
       color: '#0B59B1',
       fontWeight: 'bold',
       marginLeft: 30,
    },
 
    borderTitle: {
       textAlign: 'left',
       fontSize: 18,
       color: '#353535',
       marginLeft: 30,
    },
 
    formStyle: {
       marginBottom: -7
    },
 });
 