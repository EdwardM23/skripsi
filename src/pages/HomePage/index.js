import {
  ActivityIndicator,
  Alert,
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
// import Geolocation from '@react-native-community/geolocation';
import Geolocation from 'react-native-geolocation-service';
import {AuthContext} from '../../global/AuthContext';
import Item from '../../component/Item';
import profilePicture from '../../images/profile.png';
import refreshImg from '../../images/refresh.png';

// Geolocation.getCurrentPosition(info => console.log(info));

// const Item = ({stasiunName, tipeTransportasi, imageSource}) => (
//   <TouchableOpacity style={styles.item}>
//     <View>
//       <Image
//         source={{uri: imageSource}}
//         style={{width: 50, height: 50, marginRight: 20}}
//       />
//       {/* <Text style={{fontSize: 18, fontWeight: 'bold'}}>{imageSource}</Text> */}
//     </View>

//     <View>
//       <Text style={{fontSize: 18, fontWeight: 'bold'}}>{stasiunName}</Text>
//       <Text style={{fontSize: 14}}>{tipeTransportasi}</Text>
//     </View>
//   </TouchableOpacity>
// );

const HomePage = ({route, navigation}) => {
  // console.log('Hasil Data yang dikirim : ');
  // console.log(route.route.params);

  const [isLoading, setLoading] = useState(true);
  const [text, setText] = useState();
  const [data, setData] = useState('');
  const [currLongitude, setcurrLongitude] = useState('');
  const [currLatitude, setcurrLatitude] = useState('');

  const {userDetails} = useContext(AuthContext);
  console.log(userDetails);

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
        {
          title: 'Eatzy App Location Permission',
          message: 'Cool Eatzy App needs access to your camer',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the lcoation');
        // Geolocation.getCurrentPosition(info =>
        //   console.log(info.coords.latitude),
        // );
        console.log('Lokasi sudah didapatkan');
        Geolocation.getCurrentPosition(
          posisi => {
            console.log('GPS LOCATION', posisi);
            let currLongitude = JSON.stringify(posisi.coords.longitude);
            let currLatitud1e = JSON.stringify(posisi.coords.latitude);
            setcurrLongitude(currLongitude);
            setcurrLatitude(currLatitud1e);
            console.log(currLongitude);
            console.log(currLatitud1e);
          },
          error =>
            Alert.alert(
              'Your location currently unavailable',
              // JSON.stringify(error),
            ),
          {enableHighAccuracy: true, maximumAge: 0},
        );
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const getData = (text, currLongitude, currLatitude) => {
    console.log('Send API', currLongitude, currLatitude);
    try {
      axios
        .post('http://eatzyapp.herokuapp.com/station/nearest', {
          keyword: text,
          longitude: currLongitude,
          latitude: currLatitude,
        })
        .then(result => {
          console.log('Hasil AXIOS', result.data);
          setData(result.data);
          console.log('Hasil Data', data);
          // navigation.navigate('Home', {
          //   passUserInfo: userInfo,
          // });
        });
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Did Mount
  useEffect(() => {
    requestLocationPermission();
    console.log('Mounting');
  }, []);

  // GetLocation & Reload Lcoatuin
  const location = React.useRef(null);
  const onChangeLocation = (long, lat) => {
    clearTimeout(location.current);
    location.current = setTimeout(() => {
      getData('', long, lat);
    }, 200);
  };
  useEffect(() => {
    console.log('Did Update', text, currLongitude, currLatitude);
    onChangeLocation(currLongitude, currLatitude);
  }, [currLongitude, currLatitude]);

  // Search
  const search = React.useRef(null);
  const onChangeHandler = value => {
    clearTimeout(search.current);
    setText(value);
    search.current = setTimeout(() => {
      getData(value, currLongitude, currLatitude);
    }, 200);
  };

  const renderItem = ({item}) => (
    <Item
      itemPress={() =>
        navigation.navigate('RestauranList', {
          stationId: item.id,
        })
      }
      stasiunName={item.name}
      tipeTransportasi={item.station_type.name}
      imageSource={item.station_type.image}
    />
  );

  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <Text style={{fontSize: 18, color: colors.blue, fontWeight: 'bold'}}>
          Hello, {userDetails.username}
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Image source={profilePicture} style={{width: 45, height: 45}} />
        </TouchableOpacity>
      </View>

      <View style={styles.containerCover}>
        <Image source={cover} />
      </View>

      <View style={styles.containerSearch}>
        {/* <Text>
          Longi: {currLatitude} Lati: {currLatitude}
        </Text> */}
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={value => onChangeHandler(value)}
          placeholder="Search..."
        />
      </View>

      <View style={styles.containerListStation}>
        <View style={styles.headerStation}>
          <TitleComp text="Station" style={styles.titleFont} />
          <TouchableOpacity
            onPress={() => {
              requestLocationPermission();
              getData('', currLongitude, currLatitude);
              setText('');
            }}>
            <View style={styles.reloadLocation}>
              <Image source={refreshImg} style={styles.iconStyle} />
              <Text style={{color: colors.blue}}>Refresh</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.containerFlatList}>
          {isLoading ? (
            <ActivityIndicator size="large" style={{marginTop: 20}} />
          ) : (
            <>
              {data.length != 0 ? (
                <FlatList
                  data={data}
                  renderItem={renderItem}
                  keyExtractor={({id}, index) => id}
                  nestedScrollEnabled
                />
              ) : (
                <Text>No station found, try to search another station</Text>
              )}
            </>
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
    alignItems: 'center',
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

  headerStation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleFont: {alignItems: 'center'},
  iconStyle: {
    width: 16,
    height: 13,
    marginRight: 5,
  },
  reloadLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
