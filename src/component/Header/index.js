import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native'
import {colors, parameters} from '../../global/styles'
import arrowLeft from '../../images/arrow-left.png'

export default function Header({title}){
    return(
        <View style={styles.header}>
            <View style = {{marginLeft: 20}}>
                <TouchableOpacity>
                    <Image 
                        source={arrowLeft} 
                        style={{width: 40, height: 40}}
                    />
                </TouchableOpacity>
            </View>

            <View>
                <Text style = {styles.headerText}>{title}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header:{
        flexDirection: 'row',
        backgroundColor: colors.white,
        height: parameters.headerHeight,
        alignItems: 'center'
    },

    headerText:{
        color: colors.grey,
        fontSize: 20,
        fontWeight: '600',
        marginLeft: 30,
    }
})