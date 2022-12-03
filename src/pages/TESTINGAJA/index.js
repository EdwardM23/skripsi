import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {ActivityIndicator} from 'react-native-paper';

const ItemResto = ({name, schedule, imageUrl, priceRange}) => {
  console.log('ItemResto', name);
  <View>
    <Text>{name}</Text>;
  </View>;
  // <TouchableOpacity style={styles.item}>
  //   <View style={{position: 'relative', width: '100%'}}>
  //     <ImageBackground
  //       source={{
  //         uri: imageUrl,
  //       }}
  //       style={{height: 150, borderRadius: 10}}>
  //       <View
  //         style={{
  //           marginLeft: 10,
  //           marginRight: 10,
  //           marginTop: 10,
  //           alignItems: 'flex-end',
  //         }}>
  //         <View style={styles.ratingContainer}>
  //           <Image source={Star} style={{height: 15, width: 15}} />
  //           <Text style={styles.ratingText}>3.5</Text>
  //           <Text style={styles.count}>(15)</Text>
  //         </View>
  //       </View>
  //     </ImageBackground>
  //   </View>
  //   <View style={{width: '100%', marginTop: 5}}>
  //     <View style={styles.row}>
  //       <View style={{textAlign: 'right'}}>
  //         <Text style={styles.restoFont}>{name}</Text>
  //       </View>
  //       <View style={{flexDirection: 'row', alignItems: 'center'}}>
  //         <Image
  //           source={{
  //             uri: 'https://www.iconpacks.net/icons/2/free-location-pointer-icon-2961-thumb.png',
  //           }}
  //           style={{width: 9, height: 13, marginRight: 2}}
  //         />
  //         <Text style={styles.distanceFont}>12 KM</Text>
  //       </View>
  //     </View>
  //     <View style={styles.row}>
  //       <View>
  //         <Text
  //           style={{
  //             fontSize: 14,
  //             color: colors.grey,
  //             fontWeight: '400',
  //           }}>
  //           {schedule}
  //           {/* Indonesia <Text style={styles.status}>Status</Text> */}
  //         </Text>
  //       </View>
  //       <View style={{flexDirection: 'row', alignItems: 'center'}}>
  //         <Text
  //           style={{
  //             fontSize: 14,
  //             color: colors.grey,
  //             fontWeight: '400',
  //           }}>
  //           {priceRange}
  //         </Text>
  //       </View>
  //     </View>
  //   </View>
  // </TouchableOpacity>;
};

const Testing = () => {
  const [data, setData] = useState('');
  const [isLoading, setLoading] = useState(true);

  const getData = async () => {
    // console.log(Id);
    // const ApiLink = 'http://eatzyapp.herokuapp.com/restaurant/nearest/';
    // const ApiLinkParam =
    //   'http://eatzyapp.herokuapp.com/restaurant/nearest/' + stationId;
    // console.log(ApiLinkParam);
    try {
      const res = await axios.get(
        'http://eatzyapp.herokuapp.com/restaurant/nearest/14',
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
    getData();
  }, []);

  const renderItems = ({item}) => (
    <View
      style={{
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        display: 'flex',
        flexDirection: 'row',
      }}>
      <Text>{item.name}</Text>
    </View>
    // <ItemResto
    //   name={item.name}
    //   schedule={item.schedule}
    //   imageUrl={item.imageURL}
    //   priceRange={item.priceRange}
    // />;
  );

  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        display: 'flex',
        height: '100%',
        backgroundColor: '#ffffff',
      }}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        // <FlatList
        //   data={data}
        //   keyExtractor={({id}, index) => id}
        //   renderItem={({item}) => (
        //     <View
        //       style={{
        //         backgroundColor: '#f9c2ff',
        //         padding: 20,
        //         marginVertical: 8,
        //         display: 'flex',
        //         flexDirection: 'row',
        //       }}>
        //       <Text>{item.name}</Text>
        //     </View>
        //   )}
        // />
        <FlatList
          data={data}
          keyExtractor={({id}, index) => id}
          renderItem={renderItems}
        />
      )}
    </View>
  );
};

export default Testing;

const styles = StyleSheet.create({});
