import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import smallCover from '../../images/smallCover.png';
import Button from '../../component/Button';
import TitleComp from '../../component/TitleComp';
import FormInput from '../../component/FormInput';
import axios from 'axios';
import {handleLogin} from '../../credential/keychain';

// Valdiation
const isValidObjField = obj => {
  return Object.values(obj).every(value => value.trim());
};

const updateError = (error, stateUpdater) => {
  stateUpdater(error);
  setTimeout(() => {
    stateUpdater('');
  }, 10000);
};

const isValideEmail = value => {
  const regx =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regx.test(value);
};
// Valdiation

const Login = ({navigation}) => {
  const [error, setError] = useState(''); // untuk error massafe

  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
  });
  const {email, password} = userInfo;

  const handleOnChangeText = (value, fieldNmae) => {
    setUserInfo({...userInfo, [fieldNmae]: value});
  };

  const isValidForm = () => {
    //all value must fill
    if (!isValidObjField(userInfo)) {
      console.log(userInfo);
      return updateError('Please insert your email and password', setError);
    }

    // only valid email is allowed
    if (!isValideEmail(email)) return updateError('Invalid Email!', setError);

    // password must have 8 char or more
    if (!password.trim() || password.length < 8)
      return updateError('Password is less then 8 Character!', setError);

    return true;
  };

  const sendData = async (email, password) => {
    console.log('AXIOS POST !!!!');
    console.log('Email : ', email);
    console.log('Password : ', password);
    try {
      const res = await axios
        .post('https://eatzyapp.herokuapp.com/login', {
          email: email,
          password: password,
        })
        .then(result => {
          console.log(result.data);
          handleLogin(result.data.token, result.data.username);
          navigation.navigate('Home', {
            passUserInfo: userInfo,
          });
        })
        .catch(function (error) {
          updateError('Wrong Email or Password !!!', setError);
          console.log('Error', error);
          console.log('Response', error.response);
          console.log('Message', error.message);
        });;
    } catch (error) {
      Alert(error.message);
      setError('Invalid Username or Passowrd, Please Try Again .');
    }
  };

  const submitForm = () => {
    if (isValidForm()) {
      console.log(userInfo);
      console.log('Form Valid !!!');
      //   console.log(email);
      sendData(email, password);
    } else {
      Alert.alert('Oops please check your input !!!');
    }
  };

  return (
    <ScrollView style={styles.wrapper}>
      <View style={styles.imageContainer}>
        <Image source={smallCover} style={{width: '100%'}} />
      </View>

      <View style={styles.titleContainer}>
        <TitleComp text="Login" />
      </View>

      <View style={styles.formContainer}>
        <FormInput
          autoCapitalize="none"
          style={styles.input}
          value={email}
          onChangeText={value => handleOnChangeText(value, 'email')}
          label="Email"
          placeholder="example@gmail.com"
        />

        <FormInput
          autoCapitalize="none"
          style={styles.input}
          value={password}
          onChangeText={value => handleOnChangeText(value, 'password')}
          label="Password"
          placeholder="********"
          secureTextEntry
        />

        <View style={{height: 20}}>
          {error ? <Text style={{color: 'red'}}>{error}</Text> : null}
        </View>
      </View>

      <View style={styles.btnContainer}>
        <Button btnText="Login" onBtnPress={submitForm} />
        <TouchableOpacity onPress={() => navigation.replace('Register')}>
          <Text style={[{fontSize: 18, color: '#353535'}, styles.registerText]}>
            Don't have account?
            <Text
              style={[
                {fontSize: 18, color: '#0B59B1', fontWeight: '600'},
                styles.registerText,
              ]}>
              Register
            </Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
    marginHorizontal: 30,
    marginTop: 20,
  },

  formContainer: {
    flex: 4,
    width: '100%',
    paddingTop: 30,
    paddingHorizontal: 30,
  },

  btnContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },

  input: {
    height: 40,
    width: '100%',
    borderColor: '#353535',
    borderWidth: 1,
    borderRadius: 15,
    marginTop: 10,
    marginBottom: 15,
    paddingHorizontal: 10
  },

  textTitleLogin: {
    textAlign: 'center',
    fontSize: 24,
    color: '#0B59B1',
    fontWeight: 'bold',
  },

  registerText: {
    textAlign: 'center',
    marginTop: 15,
  },
});
