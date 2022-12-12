import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from '../../global/AuthContext';
import axios from 'axios';
import ItemResto from '../../component/ItemResto';

const History = () => {
  const {userDetails} = useContext(AuthContext);
  const [history, setHistory] = useState('');
  const [isLoading, setLoading] = useState(true);

  const getHistory = async token => {
    console.log(token);
    console.log('https://eatzyapp.herokuapp.com/wishlist/' + token);
    try {
      const res = await axios.get(
        'https://eatzyapp.herokuapp.com/history/' + token,
      );
      console.log(res);
      console.log(res.data);
      setHistory(res.data);
      console.log('Data History', history);
      // console.log(res.data);
      // console.log('Data response', res.data);
      // setData(res.data);
      // console.log('Data', data);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({item}) => (
    <ItemResto
      name={item.restaurant.name}
      schedule={item.restaurant.schedule}
      imageUrl={item.restaurant.imageURL}
      priceRange={item.restaurant.priceRange}
      walkDist=""
      restoPress={() =>
        navigation.navigate('RestoDetail', {
          passDetailResto: item.restaurant,
        })
      }
    />
  );

  useEffect(() => {
    getHistory(userDetails.token);
  }, []);

  return (
    <View>
      <Text>History</Text>
      <View>
        {history == '' ? <Text>There is no history yet</Text> : <View></View>}
        {isLoading ? (
          <ActivityIndicator size="large" style={{marginTop: 20}} />
        ) : (
          <FlatList
            data={history}
            renderItem={renderItem}
            keyExtractor={({id}, index) => id}
          />
        )}
      </View>
    </View>
  );
};

export default History;

const styles = StyleSheet.create({});
