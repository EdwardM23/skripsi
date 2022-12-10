import {View, StyleSheet, Text, Image} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import Header from '../../component/Header';
import {colors} from '../../global/styles';
import RadioButtonRN from 'radio-buttons-react-native';
import {CheckBox} from 'react-native-elements';
import Button from '../../component/Button';
import CheckBoxFilter from '../../component/CheckBoxFilter';
import {AuthContext} from '../../global/AuthContext';

const data = [
  {
    label: 'Distance',
  },
  {
    label: 'Ratings',
  },
];

const Filter = () => {
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const {filter, setFilter} = useContext(AuthContext);

  useEffect(() => {
    setFilter(['inisisasi', 'edo']);
    console.log('Filter : ', filter);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.category}>
        {/* <Header title="Filter" /> */}

        {/* <Text style={styles.title1}>Sort By</Text>

            <View style={{padding: 20}}>
                <RadioButtonRN
                    data={data}
                    selectedBtn={(e) => console.log(e)}
                    circleSize={16}
                    textStyle={{ fontSize: 18, color: colors.grey, fontWeight: '400'}}
                    boxStyle={{borderWidth: 0}}
                />
            </View> */}

        <Text style={styles.title1}>Category</Text>

        {/* <checkBoxFilter /> */}

        <View>
          <CheckBoxFilter />
          <CheckBox
            title="Asian"
            checked={check1}
            onPress={title => {
              setCheck1(!check1);
              if (check1 == true) {
                console.log('TRUE CLICK');
              } else {
                console.log('FALSE CLICK');
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

        <Text style={styles.title1}>Food</Text>

        <View>
          <Button />
          <CheckBox
            title="Bakso"
            checked={check2}
            onPress={() => setCheck2(!check2)}
            textStyle={{
              fontSize: 18,
              color: colors.grey,
              fontWeight: '400',
              marginLeft: 20,
            }}
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
      </View>
      <View
        style={{height: '10%', justifyContent: 'center', alignItems: 'center'}}>
        <Button btnText="Apply" onBtnPress={() => console.log(filter)} />
      </View>
    </View>
  );
};

export default Filter;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: colors.white,
  },
  category: {
    height: '90%',
  },
  title1: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0B59B1',
    marginTop: 15,
  },
  checkBoxText: {
    fontSize: 18,
    color: colors.grey,
    fontWeight: '400',
    marginLeft: 20,
  },
});
