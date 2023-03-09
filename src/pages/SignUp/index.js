import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import smallCover from '../../images/smallCover.png';
import Button from '../../component/Button';
import TitleComp from '../../component/TitleComp';
import FormInput from '../../component/FormInput';
import axios from 'axios';

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
  const regx = /^[^\s@,!#$%^&*()+=?\/{}|<>\[\]\\';:"]+@[^\s@,]+.[^\s@,]+$/;
//   [^\s@,!#$%^&*()+=?\/{}|<>\[\]\\';:"] -> one or more char yang tidak ada di dalam []
//    + -> one or more
  return regx.test(value);
};

const SignUp = ({navigation}) => {
  const [error, setError] = useState(''); // untuk error massafe
  const [loading, setLoading] = useState(false);

  const [userInfo, setUserInfo] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const {username, email, password, confirmPassword} = userInfo;

  const handleOnChangeText = (value, fieldNmae) => {
    setUserInfo({...userInfo, [fieldNmae]: value});
  };

  const isValidForm = () => {
    //all value must fill
    if (!isValidObjField(userInfo)) {
      console.log(userInfo);
      return updateError('Required all fields.', setError);
    }

    // name < 3
    if (!username.trim() || username.length < 6)
      return updateError('Name must more than 5 characters.', setError);

    // only valid email is allowed
    if (!isValideEmail(email))
      return updateError('Invalid email address.', setError);

    // password must have 8 char or more
    if (!password.trim() || password.length < 8)
      return updateError('Password is less than 8 character.', setError);

    // confirm password
    if (password !== confirmPassword)
      return updateError(
        'Password and confirm password must be matched.',
        setError,
      );

    return true;
  };

  const sendData = async (email, password, username) => {
    console.log('AXIOS POST !!!!');
    console.log('Email : ', email);
    console.log('Password : ', password);
    try {
      const res = await axios
        .post('https://eatzyapp.herokuapp.com/register', {
          email: email,
          password: password,
          username: username,
        })
        .then(result => {
          console.log(result);
          Alert.alert('Account successfully created');
          navigation.replace('Login');
          // handleLogin(result.data.token, 'Edward');
        })
        .catch(function (error) {
          if ((error.response.status = 400)) {
            updateError(error.response.data.message, setError);
          } else {
            updateError('Server error.', setError);
          }
          setLoading(false);
          // console.log('Error', error);
          // console.log('Response', error.response);
          // console.log('Message', error.message);
        });
      // jika berhasil login maka
      // 1. simpan toekn

      // 2. pindah halama
      // navigation.navigate('Home', {
      //   passUserInfo: userInfo,
      // });
    } catch (error) {
      Alert(error.message);
    }
  };

  const submitForm = () => {
    if (isValidForm()) {
      console.log(userInfo);
      console.log('Form Valid');
      // console.log({username});
      setLoading(true);
      sendData(email, password, username);
      if (error != '') {
        setLoading(false);
      } else if (error == '') {
        setLoading(true);
      }
    } else {
      // Alert.alert('Oops please check your input !!!');
    }
  };

  return (
    <ScrollView style={styles.wrapper}>
      <View style={styles.imageContainer}>
        <Image source={smallCover} style={{width: '100%'}} />
      </View>

      <View style={styles.titleContainer}>
        <TitleComp text="Create Account" />
      </View>

      <View style={styles.formContainer}>
        <FormInput
          autoCapitalize="none"
          style={styles.input}
          value={username}
          onChangeText={value => handleOnChangeText(value, 'username')}
          label="Name"
          placeholder="Name"
          placeholderStlye
        />

        <FormInput
          autoCapitalize="none"
          style={styles.input}
          value={email}
          onChangeText={value => handleOnChangeText(value, 'email')}
          label="Email"
          placeholder="Email"
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

        <FormInput
          autoCapitalize="none"
          style={styles.input}
          value={confirmPassword}
          onChangeText={value => handleOnChangeText(value, 'confirmPassword')}
          label="Confirm Password"
          placeholder="********"
          secureTextEntry
        />

        <View style={{height: 20}}>
          {error ? <Text style={{color: 'red'}}>{error}</Text> : null}
          {loading ? (
            <ActivityIndicator size="small" style={{marginTop: 20}} />
          ) : (
            <></>
          )}
        </View>
      </View>

      <View style={styles.btnContainer}>
        <Button btnText="Register" onBtnPress={submitForm} />
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={[{fontSize: 18, color: '#353535'}, styles.loginText]}>
            Already have an account?<Text> </Text>
            <Text
              style={[
                {fontSize: 18, color: '#0B59B1', fontWeight: '600'},
                styles.loginText,
              ]}>
              Login
            </Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default SignUp;

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
    marginBottom: 30,
  },

  input: {
    height: 40,
    width: '100%',
    borderColor: '#353535',
    borderWidth: 1,
    borderRadius: 15,
    marginTop: 10,
    marginBottom: 15,
    paddingHorizontal: 10,
  },

  textTitleCreateAccount: {
    textAlign: 'center',
    fontSize: 24,
    color: '#0B59B1',
    fontWeight: 'bold',
  },

  borderTitle: {
    textAlign: 'left',
    fontSize: 18,
    color: '#353535',
    marginLeft: 30,
  },
  loginText: {
    textAlign: 'center',
    marginTop: 15,
  },
  loginText: {
    textAlign: 'center',
    marginTop: 15,
  },
});
