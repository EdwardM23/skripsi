import {
  ActivityIndicator,
  FlatList,
  Image,
  PermissionsAndroid,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import cover from '../../images/smallCover.png';
import TitleComp from '../../component/TitleComp';
import axios from 'axios';
import {colors} from '../../global/styles';
import Geolocation from '@react-native-community/geolocation';
import { AuthContext } from '../../global/AuthContext';

// Geolocation.getCurrentPosition(info => console.log(info));

const Item = ({stasiunName, tipeTransportasi, imageSource}) => (
  <TouchableOpacity style={styles.item}>
    <View>
      <Image
        source={{uri: imageSource}}
        style={{width: 50, height: 50, marginRight: 20}}
      />
      {/* <Text style={{fontSize: 18, fontWeight: 'bold'}}>{imageSource}</Text> */}
    </View>

    <View>
      <Text style={{fontSize: 18, fontWeight: 'bold'}}>{stasiunName}</Text>
      <Text style={{fontSize: 14}}>{tipeTransportasi}</Text>
    </View>
  </TouchableOpacity>
);

const HomePage = (route, navigation) => {
  console.log('Hasil Data yang dikirim : ');
  console.log(route.route.params);

  const [isLoading, setLoading] = useState(true);
  const [text, setText] = useState();
  const [data, serData] = useState();
  const [currLongitude, setcurrLongitude] = useState('');
  const [currLatitude, setcurrLatitude] = useState('');

  const {userDetails} = useContext(AuthContext);
  console.log(userDetails);

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Izinkan Mengambil Data Lokasi ?',
          message: 'Izinkan mengambil data lokasi untuk Testing',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the lcoation');
        Geolocation.getCurrentPosition(info =>
          console.log(info.coords.latitude),
        );
        console.log('Lokasi sudah didapatkan');
        Geolocation.getCurrentPosition(
          posisi => {
            let currLongitude = JSON.stringify(posisi.coords.longitude);
            let currLatitud1e = JSON.stringify(posisi.coords.latitude);
            setcurrLongitude(currLongitude);
            setcurrLatitude(currLatitud1e);
            console.log(currLatitud1e);
            console.log(currLatitud1e);
          },
          error =>
            Alert.alert(
              'error posisi tidak bisa ditemukan',
              JSON.stringify(error),
            ),
        );
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const getData = async () => {
    try {
      const res = await axios.get('https://eatzyapp.herokuapp.com/station');
      serData(res.data);
      //   console.log(res.data);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Did Mount
  useEffect(() => {
    requestLocationPermission();
    getData();
    return() => {
      console.log('Did Update')
      // getData();
    }
  }, [text]);
  
  const renderItem = ({item}) => (
    <Item
      stasiunName={item.name}
      tipeTransportasi={item.station_category.name}
      imageSource={item.station_category.image}
    />
  );

  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
          <Text>Hello {userDetails.username}</Text>
          <Text>Profile</Text>
        </View>

      <View style={styles.containerCover}>
        <Image source={cover} />
      </View>

      <View style={styles.containerSearch}>
        <Text>
          Longi: {currLatitude} Lati: {currLatitude}
        </Text>
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={(value) => setText(value) }
          placeholder="Search..."
        />
      </View>

      <View style={styles.containerListStation}>
        <TitleComp text="Station List" style={styles.titleFont} />

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
  );
};

export default HomePage;

const styles = StyleSheet.create({
  wrapper: {
    padding: 20,
    display: 'flex',
    height: '100%',
    backgroundColor: colors.white,
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },

  input: {
    paddingVertical: 10,
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 10,
    fontSize: 16,
    borderColor: colors.blue,
  },

  containerCover: {
    flex: 3,
    zIndex: -1,
  },

  containerSearch: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'center',
  },

  containerListStation: {
    flex: 6,
    backgroundColor: colors.white,
  },

  containerFlatList: {
    flex: 1,
  },

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
