import {View, StyleSheet, Text} from 'react-native';
import React from 'react';
import Header from '../../component/Header'
import {colors} from "../../global/styles"
import RadioButtonRN from 'radio-buttons-react-native';
import { CheckBox } from 'react-native-elements'

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

            <RadioButtonRN
                data={data}
                selectedBtn={(e) => console.log(e)}
            />

            <Text style={styles.title1}>Category</Text>

            <CheckBox
                title='Asian'
                // checked={this.state.checked}
                // onPress={() => this.setState({ checked: !this.state.checked })}
            />

            <CheckBox
                title='Indonesian'
                // checked={this.state.checked}
                // onPress={() => this.setState({ checked: !this.state.checked })}
            />  

            <Text style={styles.title1}>Food</Text>

            
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
        marginBottom: 10
      },
});