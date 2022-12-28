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

const Filter = ({route, navigation}) => {
  const {filter, setFilter} = useContext(AuthContext);
  const [category, setCategory] = useState();
  const [isLoadingCategory, setLoadingCategory] = useState(true);
  const stationId = route.params.stationId;

  const getCategory = async () => {
    try {
      const res = await axios.get('https://eatzyapp.herokuapp.com/category');
      console.log('Category', res.data);
      setCategory(res.data);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoadingCategory(false);
    }
  };

  useEffect(() => {
    setFilter([]);
    getCategory();
  }, []);

  const renderItem = ({item}) => (
    <CheckBoxFilter categoryID={item.id} categoryName={item.name} />
  );

  return (
    <View style={styles.container}>
      <ScrollView style={styles.category}>
        <Text style={styles.title1}>Category</Text>

        {/* <checkBoxFilter /> */}
        <View style={{paddingBottom: 20}}>
          {isLoadingCategory ? (
            <ActivityIndicator size="large" style={{marginTop: 20}} />
          ) : (
            <FlatList
              data={category}
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
        <Button
          btnText="Apply"
          onBtnPress={() => {
            console.log(filter, stationId);
            navigation.navigate('RestaurantListFiltered', {
              filter: filter,
              stationId: stationId,
            });
          }}
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
  category: {
    padding: 20,
    height: '90%',
  },
  title1: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.blue,
  },
  checkBoxText: {
    fontSize: 18,
    color: colors.grey,
    fontWeight: '400',
    marginLeft: 20,
  },
});
