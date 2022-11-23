import {View, StyleSheet, Text, Image} from 'react-native';
import React, {useState} from 'react';
import Header from '../../component/Header'
import {colors} from "../../global/styles"
import RadioButtonRN from 'radio-buttons-react-native';
import { CheckBox } from 'react-native-elements';

const data = [
    {
      label: 'Distance'
     },
     {
      label: 'Ratings'
     }
];

const Filter = () => {
    const [check1, setCheck1] = useState(false);
    const [check2, setCheck2] = useState(false);
    return (
        <View style = {styles.container}>
            <Header title = "Filter"/>

            <Text style={styles.title1}>Sort By</Text>

            <View style={{padding: 20}}>
                <RadioButtonRN
                    data={data}
                    selectedBtn={(e) => console.log(e)}
                    circleSize={16}
                    textStyle={{ fontSize: 18, color: colors.grey, fontWeight: '400'}}
                    boxStyle={{borderWidth: 0}}
                />
            </View>

            <Text style={styles.title1}>Category</Text>

            <View style={{padding: 20}}>
                <CheckBox
                    title='Asian'
                    checked={check1}
                    onPress={() => setCheck1(!check1)}
                    textStyle={{fontSize: 18, color: colors.grey, fontWeight: '400', marginLeft: 20}}
                    checkedIcon={<Image source={require('../../images/check.png')} style={{width: 25, height: 25}}/>}
                    uncheckedIcon={<Image source={require('../../images/square.png')} style={{width: 25, height: 25}}/>}
                    containerStyle={{backgroundColor: colors.white, borderWidth: 0}}
                />

            </View>

            <Text style={styles.title1}>Food</Text>

            <View style={{padding: 20}}>
                <CheckBox
                    title='Bakso'
                    checked={check2}
                    onPress={() => setCheck2(!check2)}
                    textStyle={{ fontSize: 18, color: colors.grey, fontWeight: '400', marginLeft: 20}}
                    checkedIcon={<Image source={require('../../images/check.png')} style={{width: 25, height: 25}}/>}
                    uncheckedIcon={<Image source={require('../../images/square.png')} style={{width: 25, height: 25}}/>}
                    containerStyle={{backgroundColor: colors.white, borderWidth: 0}}
                />
            </View>

        </View>
    );
};

export default Filter;
 
const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
    },

    title1: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#0B59B1',
        marginLeft: 30,
        marginTop: 15,
      },

});