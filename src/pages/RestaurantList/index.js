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
import ItemResto from '../../component/ItemResto';
import historyImg from '../../images/history.png';
import filterImg from '../../images/filter.png';
import axios from 'axios';

// const ItemResto = ({
//   name,
//   schedule,
//   imageUrl,
//   priceRange,
//   walkDist,
//   restoPress,
// }) => (
//   <TouchableOpacity style={styles.item} onPress={restoPress}>
//     <View style={{position: 'relative', width: '100%'}}>
//       <ImageBackground
//         source={{
//           uri: imageUrl,
//         }}
//         style={{height: 150, borderRadius: 10}}>
//         <View
//           style={{
//             marginLeft: 10,
//             marginRight: 10,
//             marginTop: 10,
//             alignItems: 'flex-end',
//           }}>
//           <View style={styles.ratingContainer}>
//             <Image source={Star} style={{height: 15, width: 15}} />
//             <Text style={styles.ratingText}>3.5</Text>
//             <Text style={styles.count}>(15)</Text>
//           </View>
//         </View>
//       </ImageBackground>
//     </View>
//     <View style={{width: '100%', marginTop: 5}}>
//       <View style={styles.row}>
//         <View style={{textAlign: 'right'}}>
//           <Text style={styles.restoFont}>{name}</Text>
//         </View>
//         <View style={{flexDirection: 'row', alignItems: 'center'}}>
//           <Image
//             source={{
//               uri: 'https://www.iconpacks.net/icons/2/free-location-pointer-icon-2961-thumb.png',
//             }}
//             style={{width: 9, height: 13, marginRight: 4}}
//           />
//           <Text style={styles.distanceFont}>{walkDist} m</Text>
//         </View>
//       </View>
//       <View style={styles.row}>
//         <View>
//           <Text
//             style={{
//               fontSize: 14,
//               color: colors.grey,
//               fontWeight: '400',
//             }}>
//             {schedule}
//             {/* Indonesia <Text style={styles.status}>Status</Text> */}
//           </Text>
//         </View>
//         <View style={{flexDirection: 'row', alignItems: 'center'}}>
//           <Text
//             style={{
//               fontSize: 14,
//               color: colors.grey,
//               fontWeight: '400',
//             }}>
//             {priceRange}
//           </Text>
//         </View>
//       </View>
//     </View>
//   </TouchableOpacity>
// );

const RestauranList = ({route, navigation}) => {
  console.log('Hasil Route', route.params);

  const stationId = route.params.stationId;
  const [data, setData] = useState('');
  const [isLoading, setLoading] = useState(true);

  const getData = async Id => {
    console.log(Id);

    try {
      const res = await axios.post(
        'http://eatzyapp.herokuapp.com/restaurant/nearest/' + stationId,
      );
      //disini kasih if kalo resto nya ngaada
      console.log(res.data[0].restaurants);
      const response = res.data[0].restaurants;
      setData(response);
      console.log(response);
    } catch (error) {
      // alert(error.message);
      alert('There is no restaurant available near this station.');
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

      {/* >>> Map View <<< */}
      {/* <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={{height: '40%'}}
        region={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}></MapView> */}
      {/* >>> Map View <<< */}

      <View style={styles.wrapper}>
        <View style={styles.containerList}>
          <View style={styles.filterHist}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('History');
              }}>
              <View style={styles.histFilBtn}>
                <Image source={historyImg} style={styles.iconStyle} />
                <Text style={styles.filterFont}>History</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Filter', {
                  stationId: stationId,
                });
              }}>
              <View style={styles.histFilBtn}>
                <Image source={filterImg} style={styles.iconStyle} />
                <Text style={styles.filterFont}>Filter</Text>
              </View>
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

export default RestauranList;

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
  iconStyle: {
    width: 18,
    height: 18,
    marginRight: 5,
  },
  histFilBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
