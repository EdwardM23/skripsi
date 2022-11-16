import React from 'react';
import {View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity} from 'react-native'
import {colors} from "../../global/styles"
import Header from '../../component/Header'
import Submit from '../../component/Submit'
import {Rating} from 'react-native-ratings';
import {launchImageLibrary} from 'react-native-image-picker';
import * as ImagePicker from 'react-native-image-picker';

export default class AddReview extends React.Component{
  constructor(props){
    super(props);
    this.state = {
        resourcePath: '',
    };
  }

  render() {
    return(
        <View style = {styles.container}>
            <Header title = "Add Review"/>

            <ScrollView >
                <View style={{marginLeft: 30, marginTop: 10}}>
                    {/* Rate Your Experience */}
                    <View>
                        <Text style={styles.title}>Rate Your Experience</Text>
                        <Rating
                            // showRating
                            onFinishRating={this.ratingCompleted}
                            style={{paddingVertical: 10}}
                        />
                    </View>
                    
                    {/* Write a Review */}
                    <View style={{marginTop:30}}>
                        <Text style={styles.title}>Write a Review</Text>

                        <TextInput
                            style={styles.textInput}
                            placeholder = "Tell us more about your experience"
                            
                        />
                    </View>

                    {/* Add Photos */}
                    <View style={{marginTop:30}}>
                        <Text style={styles.title}>Add Photos</Text>

                        <Text style={{alignItems:'center'}}>
                        {this.state.resourcePath.uri}
                        </Text>

                        <Text>
                            <TouchableOpacity style={styles.button} 
                            onPress={()=> 
                                ImagePicker.launchImageLibrary({
                                    mediaType: 'photo',
                                    includeBase64: false,
                                    maxHeight: 200,
                                    maxWidth: 200
                                },
                                (response) => {
                                    console.log(response.assets[0].uri);
                                    this.setState({resourcePath: response.assets[0].uri});
                                }
                            )}>

                                <Text style={styles.buttonText}>Select File</Text>

                            </TouchableOpacity>
                        </Text>
                    </View>

                </View>
            </ScrollView>

            <Submit title = "Submit" type="arrow-left" />
            
        </View>
    )
}
  
}

const styles = StyleSheet.create({
  container: {
    // flex:1,
    backgroundColor: colors.white
  },

  title: {
    color: colors.blue,
    fontSize: 18,
    fontWeight: '600'
  },

  textInput: {
    borderWidth: 1,
    borderColor: colors.grey,
    borderRadius: 15,
    width: 350,
    height: 150,
    marginTop: 15,
    textAlignVertical: 'top', 
    fontSize: 14
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
    color: colors.grey
  },

  submit: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
})