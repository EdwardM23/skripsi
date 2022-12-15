import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
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

const AddReview = ({route, navigation}) => {
  const restaurantId = route.params.restaurantId;
  const {userDetails} = useContext(AuthContext);
  const [resourcePath, setResourcePath] = useState('');
  const [review, setReview] = useState('');
  const [rating, setRating] = useState('5');
  const [isAnonymous, setIsAnonymous] = useState(false);

  const ratingCompleted = value => {
    console.log('Rating is: ' + value);
    setRating(value);
  };

  const addReview = async (
    token,
    restaurantId,
    file,
    rating,
    review,
    isAnonymous,
  ) => {
    try {
      const datas = new FormData();
      datas.append('token', token);
      datas.append('restaurantId', restaurantId);
      datas.append('rating', rating);
      datas.append('review', review);
      datas.append('isAnonymous', isAnonymous);
      datas.append('file', {
        uri: file.uri,
        type: file.type,
        name: file.fileName,
      });

      console.log('DATAS: ', datas);

      axios
        .post('https://eatzyapp.herokuapp.com/review', datas, {
          headers: {'Content-Type': 'multipart/form-data'},
        })
        .then(res => {
          console.log('Resilt : ', res);
        })
        .catch(error => {
          console.log('Error', error);
          console.log('Response', error.response);
          console.log('Message', error.message);
        });
    } catch (error) {
      alert(error.message);
    }
  };

  const addReview1 = async (
    token,
    restaurantId,
    file,
    rating,
    review,
    isAnonymous,
  ) => {
    try {
      const img = Buffer.from(file.base64, 'base64');
      console.log('This is Buffer >> ', img);
      // datas.append('images', {
      //   name: file.fileName,
      //   type: file.type,
      //   uri: file.uri,
      // });
      console.log();
      console.log('name: ', file.fileName);
      console.log('data: ', img);
      console.log('size: ', file.fileSize);
      console.log('encoding: ', file.encoding);
      console.log('tempFilePath: ', file.uri);
      console.log('truncated: ', false);
      await axios
        .post('https://eatzyapp.herokuapp.com/review', {
          token: token,
          restaurantId: restaurantId,
          file: {
            name: file.fileName,
            data: img,
            size: file.fileSize,
            tempFilePath: file.uri,
            mimeType: file.type,
          },
          rating: rating,
          review: review,
          isAnonymous: isAnonymous,
        })
        .then(result => {
          console.log('Resilt : ', result);
          // alert(result.data.msg);
        })
        .catch(function (error) {
          console.log('Error', error);
          console.log('Response', error.response);
          console.log('Message', error.message);
          // alert('This restaurant already in your wishlist');
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
            <Text style={styles.title}>Write a Review</Text>

            <TextInput
              style={styles.textInput}
              placeholder="Tell us more about your experience"
              onChangeText={value => setReview(value)}
            />
          </View>

          {/* Add Photos */}
          <View style={{marginTop: 30}}>
            <Text style={styles.title}>Add Photo</Text>

            {/* <Text style={{alignItems: 'center'}}>{resourcePath.uri}</Text> */}

            <Text>
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
            </Text>
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
        </View>
      </ScrollView>

      {/* <Submit title="Submit" type="arrow-left" /> */}
      <View style={styles.submit}>
        <Button
          btnText="Submit"
          onBtnPress={() => {
            addReview(
              userDetails.token,
              restaurantId,
              resourcePath,
              rating,
              review,
              isAnonymous,
            );
            navigation.navigate('AllReviews', {
              passRestoId: restaurantId,
            });
          }}
        />
      </View>
    </View>
  );
};

export default AddReview;

const styles = StyleSheet.create({
  container: {
    // flex:1,
    backgroundColor: colors.white,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  form: {
    height: '90%',
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
    width: 350,
    height: 150,
    marginTop: 15,
    textAlignVertical: 'top',
    fontSize: 14,
    padding: 10,
  },

  button: {
    width: 350,
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
