import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import {colors, parameters} from '../../global/styles'

export default function Submit({title}){
    return(
        <View>
        <TouchableOpacity>
          <View style={styles.footer}>
            <View style={styles.buttonWrap}>
                <Text style = {styles.footerText}>{title}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    )
}

const styles = StyleSheet.create({
    footer:{
        flexDirection: 'row',
        backgroundColor: colors.white,
        height: parameters.footerHeight,
        alignItems: 'center',
    },

    buttonWrap: {
        backgroundColor: '#FCCC0A',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
        width: 325,
        height: 50,
        marginLeft: 45,
        marginBottom: 20
    },

    footerText:{
        color: colors.grey,
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center'
    },
})