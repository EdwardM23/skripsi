import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  LogBox,
} from 'react-native';
import Header from '../../component/Header';
import {colors} from '../../global/styles';
import profilePicture from '../../images/profile.png';
import logout from '../../images/logout.png';
import {AuthContext} from '../../global/AuthContext';
import TitleComp from '../../component/TitleComp';
import ItemResto from '../../component/ItemResto';
import axios from 'axios';

LogBox.ignoreLogs([
  'VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality - use another VirtualizedList-backed container instead.',
]);

// const WishlistCard = ({review, imageUrl, reviewTime, name}) => (
//   <View style={styles.item}>
//     <View style={styles.cardHeader}>
//       <View style={styles.restaurantInfo}>
//         <Image
//           source={Profile}
//           style={{height: 35, width: 35, borderRadius: 35}}
//         />

//         <View style={styles.restaurantInfoText}>
//           <Text style={styles.reviewText1}>{name}</Text>

//           <View style={{flexDirection: 'row'}}>
//             <Text style={styles.reviewText2}>{reviewTime}</Text>
//           </View>
//         </View>
//       </View>

//       <View style={styles.reviewRate}>
//         {/* <Image source={Star} style={{height: 15, width: 15}} /> */}
//         {/* <Text style={styles.ratingText}>{rating}</Text> */}
//       </View>
//     </View>

//     <View
//       style={{
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         marginTop: 10,
//       }}>
//       <Text style={styles.description}>{review}</Text>

//       {imageUrl == '' ? (
//         <></>
//       ) : (
//         <Image
//           source={{
//             uri: imageUrl,
//           }}
//           style={{width: '30%', height: 100, borderRadius: 15}}
//         />
//       )}
//     </View>
//   </View>
// );

const Profile = ({navigation, route}) => {
  const {userDetails, handleLogout} = useContext(AuthContext);
  const [wishlist, setWishlist] = useState('');
  const [isLoading, setLoading] = useState(true);
  console.log(userDetails);

  const getWishlist = async token => {
    console.log(token);
    console.log('https://eatzyapp.herokuapp.com/wishlist/' + token);
    try {
      const res = await axios.get(
        'https://eatzyapp.herokuapp.com/wishlist/' + token,
      );
      console.log(res.data[0].restaurants);
      setWishlist(res.data[0].restaurants);
      console.log('Wishlist Data >> ', res.data[0].restaurants);
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

  useEffect(() => {
    getWishlist(userDetails.token);
  }, []);

  const renderItem = ({item}) => (
    <ItemResto
      restoId={item.id}
      name={item.name}
      schedule={item.schedule}
      imageUrl={item.imageURL}
      priceRange={item.priceRange}
      walkDist=""
      restoPress={() =>
        navigation.navigate('RestoDetail', {
          passDetailResto: item,
        })
      }
    />
  );
  return (
    <View style={styles.container}>
      {/* <Header title="Account" /> */}
      <ScrollView>
        {/* Account */}
        <View style={styles.borderContainer}>
          <View style={styles.leftContainer}>
            {/* <View>
              <Image source={profilePicture} style={{width: 50, height: 50}} />
            </View> */}

            <View>
              <Text style={styles.username}>{userDetails.username}</Text>
              <Text style={styles.email}>{userDetails.email}</Text>
            </View>
          </View>

          <View>
            <TouchableOpacity
              onPress={() => {
                handleLogout(), navigation.replace('Splash');
              }}>
              <Image source={logout} style={{width: 20, height: 20}} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Wishlist */}
        <View style={styles.title}>
          <TitleComp text="Your Wishlist" />
        </View>
        {/* <Text style={styles.title}>Your Wishlist</Text> */}

        {/* Wishlist Card */}
        <View>
          {isLoading ? (
            <ActivityIndicator size="large" style={{marginTop: 20}} />
          ) : (
            <FlatList
              data={wishlist}
              renderItem={renderItem}
              keyExtractor={({id}, index) => id}
            />
          )}
          {/* <ReviewCard /> */}
          {/* <ItemResto /> */}
        </View>
      </ScrollView>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    // flex:1,
    backgroundColor: colors.white,
    padding: 10,
  },

  title: {
    marginLeft: 20,
    marginTop: 30,
  },

  borderContainer: {
    borderWidth: 1,
    borderRadius: 15,
    paddingVertical: 15,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: 10,
  },

  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  username: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.grey,
  },

  email: {
    fontSize: 18,
    fontWeight: '400',
    color: colors.grey,
  },

  /*Wishlist Card CSS*/
  wrapper: {
    paddingTop: 10,
    paddingHorizontal: 20,
    display: 'flex',
    backgroundColor: colors.white,
  },
  containerFlatList: {
    flex: 1,
    padding: 20,
    display: 'flex',
    height: '100%',
    backgroundColor: '#ffffff',
  },
  item: {
    backgroundColor: colors.white,
    padding: 10,
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
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  restaurantInfo: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 3,
  },
  restaurantInfoText: {
    marginLeft: 10,
  },
  reviewText1: {
    fontSize: 14,
    color: colors.grey,
    fontWeight: 'bold',
  },
  reviewText2: {
    fontSize: 14,
    color: colors.grey,
    fontWeight: '400',
  },
  ratingText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.grey,
  },
  reviewRate: {
    backgroundColor: colors.white,
    width: 60,
    height: 30,
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(53, 53, 53, 0.15)',
  },
  description: {
    fontSize: 14,
    color: colors.grey,
    fontWeight: '400',
    textAlign: 'justify',
    lineHeight: 21,
    width: '70%',
  },
});
