import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  ActivityIndicator,
} from 'react-native';
import {colors} from '../../global/styles';
import Header from '../../component/Header';
import Submit from '../../component/Submit';
import {AirbnbRating, Rating} from 'react-native-ratings';
import {launchImageLibrary} from 'react-native-image-picker';
import * as ImagePicker from 'react-native-image-picker';
import {CheckBox} from 'react-native-elements';
import Button from '../../component/Button';
import {AuthContext} from '../../global/AuthContext';
import {Buffer} from 'buffer';
import axios, {Axios} from 'axios';
import {wrap} from 'module';

const updateError = (error, stateUpdater) => {
  stateUpdater(error);
  setTimeout(() => {
    stateUpdater('');
  }, 10000);
};

const AddReview = ({route, navigation}) => {
  const restaurantId = route.params.restaurantId;
  const {userDetails} = useContext(AuthContext);
  const [resourcePath, setResourcePath] = useState('');
  const [review, setReview] = useState('');
  const [rating, setRating] = useState('5');
  const [textLen, setTextLen] = useState(0);
  const [error, setError] = useState('');
  const [isSubmit, setIsSubmit] = useState(false);
  const [isAnonymous, setIsAnonymous] = useState(false);

  useEffect(() => {
    const refresh = navigation.addListener('focus', () => {
      setIsSubmit(false);
    });
    return refresh;
  }, [navigation]);

  const handleOnChangeText = value => {
    setReview(value);
    setTextLen(value.length);
  };

  const ratingCompleted = value => {
    console.log('Rating is: ' + value);
    setRating(value);
  };

  const isValidForm = () => {
    if (textLen > 150)
      return updateError('Review must be less than 150 characters.', setError);
    return true;
  };

  const addReview = async (
    token,
    restaurantId,
    file,
    rating,
    review,
    isAnonymous,
  ) => {
    setIsSubmit(true);
    try {
      const datas = new FormData();
      datas.append('token', token);
      datas.append('restaurantId', restaurantId);
      datas.append('rating', rating);
      datas.append('review', review);
      datas.append('isAnonymous', isAnonymous);

      // Check Image Exist or Not
      if (file == '') {
      } else if (file != '') {
        datas.append('file', {
          uri: file.uri,
          type: file.type,
          name: file.fileName,
        });
      }

      console.log('DATAS: ', datas);

      await axios
        .post('https://eatzyapp.herokuapp.com/review', datas, {
          headers: {'Content-Type': 'multipart/form-data'},
        })
        .then(res => {
          console.log('Resilt : ', res);
          navigation.replace('AllReviews', {
            passRestoId: restaurantId,
          });
        })
        .catch(error => {
          if ((error.response.status = 400)) {
            Alert.alert(error.response.data.msg);
          } else {
            Alert.alert('Server error');
          }
          setIsSubmit(false);
          console.log('Error', error);
          console.log('Response', error.response);
          console.log('Message', error.message);
        });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      {/* <Header title="Add Review" /> */}
      <ScrollView style={styles.form}>
        <View>
          {/* Rate Your Experience */}
          <View>
            <Text style={styles.title}>Rate Your Experience</Text>
            <AirbnbRating
              showRating={false}
              defaultRating={5}
              ratingCount={5}
              onFinishRating={ratingCompleted}
              style={{paddingVertical: 10}}
            />
          </View>
          {/* Write a Review */}
          <View style={{marginTop: 30}}>
            <Text style={styles.title}>
              Write a Review<Text> </Text>
              {textLen <= 150 ? (
                <Text>({textLen}/150)</Text>
              ) : (
                <Text style={{color: colors.red}}>({textLen}/150)</Text>
              )}
            </Text>
            <TextInput
              style={styles.textInput}
              placeholder="Tell us more about your experience"
              multiline={true}
              onChangeText={value => handleOnChangeText(value)}
            />
            {error ? (
              <View style={{height: 20}}>
                <Text style={{color: 'red'}}>* {error}</Text>
              </View>
            ) : null}
          </View>

          {/* Add Photos */}
          <View style={{marginTop: 30}}>
            <Text style={styles.title}>Add Photo</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                ImagePicker.launchImageLibrary(
                  {
                    mediaType: 'photo',
                    includeBase64: true,
                    maxHeight: 200,
                    maxWidth: 200,
                  },
                  response => {
                    console.log('res', response);
                    if (Object.keys(response) == 'didCancel') {
                      console.log('Batal Upload Foto');
                    } else if (Object.keys(response) == 'assets') {
                      console.log('Foto Uploaded');
                      setResourcePath(response.assets[0]);
                    }
                    // console.log(response.assets[0].uri);
                    // setResourcePath(response.assets[0]);
                  },
                )
              }>
              {resourcePath == '' ? (
                <Text style={styles.buttonText}>Select a photo</Text>
              ) : (
                <Text></Text>
              )}

              {resourcePath == '' ? (
                <View></View>
              ) : (
                <Image
                  source={{uri: resourcePath.uri}}
                  style={{width: 100, height: 100}}
                />
              )}
            </TouchableOpacity>
          </View>

          {/* Anonymous */}
          <View>
            <CheckBox
              title="Submit as anonymous"
              checked={isAnonymous}
              onPress={() => {
                setIsAnonymous(!isAnonymous);
                if (isAnonymous == true) {
                  console.log('After Click : ');
                } else if (isAnonymous == false) {
                  console.log('False Click : ');
                }
              }}
              textStyle={{fontWeight: '400'}}
              checkedIcon={
                <Image
                  source={require('../../images/check.png')}
                  style={{width: 25, height: 25, opacity: 0.8}}
                />
              }
              uncheckedIcon={
                <Image
                  source={require('../../images/square.png')}
                  style={{width: 25, height: 25, opacity: 0.5}}
                />
              }
              containerStyle={{backgroundColor: colors.white, borderWidth: 0}}
            />
          </View>
          {isSubmit == true ? (
            <View>
              <ActivityIndicator size="large" style={{marginTop: 20}} />
            </View>
          ) : (
            <View></View>
          )}
        </View>
      </ScrollView>

      {/* <Submit title="Submit" type="arrow-left" /> */}
      <View style={styles.submit}>
        <Button
          btnText="Submit"
          onBtnPress={() => {
            if (isValidForm()) {
              if (!isSubmit) {
                addReview(
                  userDetails.token,
                  restaurantId,
                  resourcePath,
                  rating,
                  review,
                  isAnonymous,
                );
              }
              // setTimeout(() => {
              //   navigation.replace('AllReviews', {
              //     passRestoId: restaurantId,
              //   });
              // }, 2000);
            } else {
              // Alert.alert('Oops please check your input !!!');
            }
          }}
        />
      </View>
    </View>
  );
};

export default AddReview;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  form: {
    height: '90%',
    width: '95%',
  },

  title: {
    color: colors.blue,
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },

  textInput: {
    borderWidth: 1,
    borderColor: colors.grey,
    borderRadius: 15,
    width: '100%',
    height: 100,
    textAlignVertical: 'top',
    fontSize: 14,
    padding: 10,
  },

  button: {
    width: '100%',
    height: 150,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    borderColor: colors.grey,
    borderWidth: 1,
  },

  buttonText: {
    textAlign: 'center',
    fontSize: 14,
    color: colors.grey,
  },

  submit: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '20%',
  },
});
