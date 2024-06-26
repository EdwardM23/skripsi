import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useContext, useState} from 'react';
import {colors} from '../../global/styles';
import {CheckBox} from 'react-native-elements';
import {AuthContext} from '../../global/AuthContext';

const CheckBoxFilter = ({categoryID, categoryName}) => {
  const [check, setCheck] = useState(false);
  const {filter, setFilter} = useContext(AuthContext);

  return (
    <View>
      <CheckBox
        title={categoryName}
        checked={check}
        onPress={() => {
          setCheck(!check);
          if (check == true) {
            console.log('After Click : ', filter);
            console.log(filter.indexOf(categoryID));
            filter.splice(filter.indexOf(categoryID), 1);
          } else if (check == false) {
            console.log('False Click : ', filter);
            setFilter(filter => [...filter, categoryID]); //filter sebeumnya tambah ',' filter yang baru di checklist
          }
        }}
        textStyle={styles.checkBoxText}
        checkedIcon={
          <Image
            source={require('../../images/check.png')}
            style={{width: 25, height: 25}}
          />
        }
        uncheckedIcon={
          <Image
            source={require('../../images/square.png')}
            style={{width: 25, height: 25}}
          />
        }
        containerStyle={{backgroundColor: colors.white, borderWidth: 0}}
      />
    </View>
  );
};

export default CheckBoxFilter;

const styles = StyleSheet.create({
  checkBoxText: {
    fontSize: 18,
    color: colors.grey,
    fontWeight: '400',
    marginLeft: 20,
  },
});
