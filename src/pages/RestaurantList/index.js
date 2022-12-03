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
import React, {useEffect, useState} from 'react';
import TitleComp from '../../component/TitleComp';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import Header from '../../component/Header';
import {colors} from '../../global/styles';
import Star from '../../images/star.png';
import axios from 'axios';

const ItemResto = ({name, schedule, imageUrl, priceRange}) => (
  <TouchableOpacity style={styles.item}>
    <View style={{position: 'relative', width: '100%'}}>
      <ImageBackground
        source={{
          uri: imageUrl,
        }}
        style={{height: 150, borderRadius: 10}}>
        <View
          style={{
            marginLeft: 10,
            marginRight: 10,
            marginTop: 10,
            alignItems: 'flex-end',
          }}>
          <View style={styles.ratingContainer}>
            <Image source={Star} style={{height: 15, width: 15}} />
            <Text style={styles.ratingText}>3.5</Text>
            <Text style={styles.count}>(15)</Text>
          </View>
        </View>
      </ImageBackground>
    </View>
    <View style={{width: '100%', marginTop: 5}}>
      <View style={styles.row}>
        <View style={{textAlign: 'right'}}>
          <Text style={styles.restoFont}>{name}</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={{
              uri: 'https://www.iconpacks.net/icons/2/free-location-pointer-icon-2961-thumb.png',
            }}
            style={{width: 9, height: 13, marginRight: 2}}
          />
          <Text style={styles.distanceFont}>12 KM</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View>
          <Text
            style={{
              fontSize: 14,
              color: colors.grey,
              fontWeight: '400',
            }}>
            {schedule}
            {/* Indonesia <Text style={styles.status}>Status</Text> */}
          </Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text
            style={{
              fontSize: 14,
              color: colors.grey,
              fontWeight: '400',
            }}>
            {priceRange}
          </Text>
        </View>
      </View>
    </View>
  </TouchableOpacity>
);

const RestauranList = (route, navigation) => {
  // console.log(route.route.params.stationId);

  const stationId = route.route.params.stationId;
  const [data, setData] = useState('');
  const [isLoading, setLoading] = useState(true);

  const getData = async Id => {
    console.log(Id);
    // const ApiLink = 'http://eatzyapp.herokuapp.com/restaurant/nearest/';
    // const ApiLinkParam =
    //   'http://eatzyapp.herokuapp.com/restaurant/nearest/' + stationId;
    // console.log(ApiLinkParam);
    try {
      const res = await axios.get(
        'http://eatzyapp.herokuapp.com/restaurant/nearest/' + stationId,
      );
      const response = res.data.rows[0].restaurants;
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
      name={item.name}
      schedule={item.schedule}
      imageUrl={item.imageURL}
      priceRange={item.priceRange}
    />
  );

  return (
    <View>
      {/* <Header title="Restaurant" /> */}
      <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={{height: '40%'}}
        region={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}></MapView>

      <View style={styles.wrapper}>
        <View style={styles.containerList}>
          <Text style={styles.filterFont}>FILTER</Text>

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

export default RestauranList;

const styles = StyleSheet.create({
  wrapper: {
    padding: 10,
    display: 'flex',
    height: '60%',
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
    marginRight: 30,
    marginTop: 10,
    marginBottom: 10,
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
});
