import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {colors} from '../../global/styles';

const Item = ({stasiunName, tipeTransportasi, imageSource, itemPress}) => (
  <TouchableOpacity style={styles.item} onPress={itemPress}>
    <View>
      <Image
        source={{uri: imageSource}}
        style={{width: 50, height: 50, marginRight: 20}}
      />
    </View>

    <View>
      <Text style={{fontSize: 18, fontWeight: 'bold'}}>{stasiunName}</Text>
      <Text style={{fontSize: 14}}>{tipeTransportasi}</Text>
    </View>
  </TouchableOpacity>
);

export default Item;

const styles = StyleSheet.create({
  item: {
    backgroundColor: colors.white,
    padding: 20,
    marginVertical: 8,
    display: 'flex',
    flexDirection: 'row',
    shadowColor: colors.grey,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 15,
  },
});
