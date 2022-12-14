import {
  Image,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import TitleComp from '../../component/TitleComp';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import Header from '../../component/Header';
import {colors} from '../../global/styles';
import Star from '../../images/star.png';
import ItemResto from '../../component/ItemResto';
import axios from 'axios';
import {AuthContext} from '../../global/AuthContext';

const RestauranListFiltered = ({route, navigation}) => {
  console.log('Hasil Route', route.params);

  const stationId = route.params.stationId;
  const {filter} = useContext(AuthContext);
  const [data, setData] = useState('');
  const [isLoading, setLoading] = useState(true);

  const getData = async Id => {
    console.log(Id);

    try {
      const res = await axios.post(
        'http://eatzyapp.herokuapp.com/restaurant/nearest/' + stationId,
        {
          categories: filter,
        },
      );
      console.log('return >>', res);
      console.log(res.data[0].restaurants);
      const response = res.data[0].restaurants;
      setData(response);
      console.log(response);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData(stationId);
  }, []);

  const renderItem = ({item}) => (
    <ItemResto
      restoId={item.id}
      name={item.name}
      schedule={item.schedule}
      imageUrl={item.imageURL}
      priceRange={item.priceRange}
      walkDist={item.restaurant_detail.walkDistance}
      restoPress={() =>
        navigation.navigate('RestoDetail', {
          passDetailResto: item,
        })
      }
    />
  );

  return (
    <View>
      {/* <Header title="Restaurant" /> */}
      {/* <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={{height: '40%'}}
        region={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}></MapView> */}

      <View style={styles.wrapper}>
        <View style={styles.containerList}>
          <View style={styles.filterHist}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('History');
              }}>
              <Text style={styles.filterFont}>History</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Filter', {
                  stationId: stationId,
                });
              }}>
              <Text style={styles.filterFont}>Filter</Text>
            </TouchableOpacity>
          </View>

          {/* Item Resto */}
          <View style={styles.containerFlatList}>
            {isLoading ? (
              <ActivityIndicator size="large" style={{marginTop: 20}} />
            ) : (
              <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={({id}, index) => id}
                nestedScrollEnabled
              />
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

export default RestauranListFiltered;

const styles = StyleSheet.create({
  wrapper: {
    padding: 10,
    display: 'flex',
    // height: '60%',
    height: '100%',
    backgroundColor: '#ffffff',
  },

  item: {
    backgroundColor: colors.white,
    padding: 20,
    marginVertical: 8,
    display: 'flex',
    width: '100%',
    shadowColor: colors.grey,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 15,
    borderColor: colors.grey,
  },

  status: {
    color: colors.red,
    fontWeight: '600',
    fontSize: 14,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 2,
  },

  containerList: {
    flex: 6,
    backgroundColor: colors.white,
  },

  containerFlatList: {
    flex: 1,
  },

  rating_review: {
    position: 'absolute',
    backgroundColor: '#FFFFFF',
    top: '8%',
    left: '65%',
    borderRadius: 5,
    padding: 2,
  },

  filterFont: {
    color: colors.blue,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'right',
  },

  restoFont: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.grey,
  },

  distanceFont: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.grey,
  },

  ratingContainer: {
    backgroundColor: colors.white,
    width: 75,
    height: 30,
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },

  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.grey,
  },

  count: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.grey,
  },
  filterHist: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginHorizontal: 10,
    marginTop: 10,
    marginBottom: 10,
  },
});
