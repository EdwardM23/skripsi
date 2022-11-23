import {View, StyleSheet, Text} from 'react-native';
import React from 'react';
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
                />
            </View>

            <Text style={styles.title1}>Category</Text>

            <View style={{padding: 20}}>
                <CheckBox
                    title='Asian'
                    // checked={this.state.checked}
                    // onPress={() => this.setState({ checked: !this.state.checked })}
                    textStyle={{ fontSize: 18, color: colors.grey, fontWeight: '400'}}
                />

            </View>

            <Text style={styles.title1}>Food</Text>

            <View style={{padding: 20}}>
                <CheckBox
                    title='Asian'
                    // checked={this.state.checked}
                    // onPress={() => this.setState({ checked: !this.state.checked })}
                    textStyle={{ fontSize: 18, color: colors.grey, fontWeight: '400'}}
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