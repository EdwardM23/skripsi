import {
  View,
  StyleSheet,
  Text,
  Image,
  ActivityIndicator,
  FlatList,
  ScrollView,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import Header from '../../component/Header';
import {colors} from '../../global/styles';
import RadioButtonRN from 'radio-buttons-react-native';
import {CheckBox} from 'react-native-elements';
import Button from '../../component/Button';
import CheckBoxFilter from '../../component/CheckBoxFilter';
import {AuthContext} from '../../global/AuthContext';
import axios from 'axios';

const data = [
  {
    label: 'Distance',
  },
  {
    label: 'Ratings',
  },
];

const Filter = () => {
  const {filter, setFilter} = useContext(AuthContext);
  const [food, setFood] = useState();
  const [cuisine, setCuisine] = useState();
  const [isLoadingFood, setLoadingFood] = useState(true);
  const [isLoadingCuisine, setLoadingCuisine] = useState(true);
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);

  const getFoodCategory = async () => {
    try {
      const res = await axios.get(
        'https://eatzyapp.herokuapp.com/category/food',
      );
      console.log('Category', res.data);
      setFood(res.data);
      // console.log(res.data);
      // console.log('Data response', res.data);
      // setData(res.data);
      // console.log('Data', data);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoadingFood(false);
    }
  };

  const getCuisineCategory = async () => {
    try {
      const res = await axios.get(
        'https://eatzyapp.herokuapp.com/category/cuisine',
      );
      console.log('Cuisine', res.data);
      setCuisine(res.data);
      // console.log(res.data);
      // console.log('Data response', res.data);
      // setData(res.data);
      // console.log('Data', data);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoadingCuisine(false);
    }
  };

  useEffect(() => {
    setFilter([]);
    getFoodCategory();
    getCuisineCategory();
    console.log('Filter : ', filter);
  }, []);

  const renderItem = ({item}) => (
    <CheckBoxFilter categoryID={item.id} categoryName={item.name} />
  );

  return (
    <View style={styles.container}>
      <ScrollView style={styles.category}>
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
          {isLoadingCuisine ? (
            <ActivityIndicator size="large" style={{marginTop: 20}} />
          ) : (
            <FlatList
              data={cuisine}
              renderItem={renderItem}
              keyExtractor={({id}, index) => id}
            />
          )}
        </View>

        <Text style={styles.title1}>Food</Text>

        <View>
          {isLoadingFood ? (
            <ActivityIndicator size="large" style={{marginTop: 20}} />
          ) : (
            <FlatList
              data={food}
              renderItem={renderItem}
              keyExtractor={({id}, index) => id}
            />
          )}
        </View>
      </ScrollView>
      <View
        style={{
          height: '10%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Button btnText="Apply" onBtnPress={() => console.log(filter)} />
      </View>
    </View>
  );
};

export default Filter;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
  },
  category: {
    padding: 20,
    height: '90%',
  },
  title1: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0B59B1',
  },
  checkBoxText: {
    fontSize: 18,
    color: colors.grey,
    fontWeight: '400',
    marginLeft: 20,
  },
});
