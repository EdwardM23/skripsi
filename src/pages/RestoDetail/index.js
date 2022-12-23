import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  ImageBackground,
  Linking,
  LogBox,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import TitleComp from '../../component/TitleComp';
import imgPrice from '../../images/Price.png';
import imgCuisine from '../../images/Cuisine.png';
import imgHour from '../../images/Hour.png';
import Header from '../../component/Header';
import {colors} from '../../global/styles';
import Profile from '../../images/profile.png';
import Star from '../../images/star.png';
import Like from '../../images/like.png';
import Unlike from '../../images/unlike.png';
import {AuthContext} from '../../global/AuthContext';
import axios from 'axios';

LogBox.ignoreLogs([
  'VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality - use another VirtualizedList-backed container instead.',
]);

const ReviewCard = ({review, rating, imageUrl, reviewTime, name}) => (
  <View style={styles.item}>
    <View style={styles.cardHeader}>
      <View style={styles.restaurantInfo}>
        <Image
          source={Profile}
          style={{height: 35, width: 35, borderRadius: 35}}
        />

        <View style={styles.restaurantInfoText}>
          <Text style={styles.reviewText1}>{name}</Text>

          <View style={{flexDirection: 'row'}}>
            <Text style={styles.reviewText2}>
              {reviewTime.replace(/T|Z/g, ' ').substring(0, 19)}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.reviewRate}>
        <Image source={Star} style={{height: 15, width: 15}} />
        <Text style={styles.ratingText}>{rating}</Text>
      </View>
    </View>

    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
      }}>
      <Text style={styles.description}>{review}</Text>

      {imageUrl == '' ? (
        <></>
      ) : (
        <Image
          source={{
            uri: imageUrl,
          }}
          style={{width: '30%', height: 100, borderRadius: 15}}
        />
      )}
    </View>
  </View>
);

const RestoDetail = ({route, navigation}) => {
  console.log(route.params.passDetailResto);
  const detailInfo = route.params.passDetailResto;
  const [data, setData] = useState('');
  const {userDetails} = useContext(AuthContext);
  const [isLoading, setLoading] = useState(true);
  const [isLike, setIsLike] = useState();
  console.log('Resto ID', detailInfo.id);

  const getData = async () => {
    try {
      const res = await axios.get(
        'https://eatzyapp.herokuapp.com/review/top/' + detailInfo.id,
      );
      console.log(res.data);
      console.log('Data response', res.data);
      setData(res.data);
      console.log('Data', data);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const addWishlist = async (token, restaurantId) => {
    try {
      const res = await axios
        .post('https://eatzyapp.herokuapp.com/wishlist', {
          token: token,
          restaurantId: restaurantId,
        })
        .then(result => {
          setIsLike(true);
          console.log(result.data);
          alert(result.data.msg);
        })
        .catch(function (error) {
          console.log('Error', error);
          console.log('Response', error.response);
          console.log('Message', error.message);
          alert('This restaurant already in your wishlist');
        });
    } catch (error) {
      alert(error.message);
    }
  };

  const removeWishlist = async (token, restaurantId) => {
    console.log('DELETE PASS', token, restaurantId);
    try {
      await axios
        .delete('https://eatzyapp.herokuapp.com/wishlist', {
          data: {token: token, restaurantId: restaurantId},
        })
        .then(result => {
          setIsLike(false);
          console.log('DELETE', result);
        })
        .catch(function (error) {
          console.log('Error Delete');
          console.log('Error', error);
          console.log('Response', error.response);
          console.log('Message', error.message);
          alert('Error Delete');
        });
    } catch (error) {
      alert(error.message);
    }
  };

  const checkWishlist = async (token, restaurantId) => {
    try {
      const res = await axios
        .post('https://eatzyapp.herokuapp.com/wishlist/status', {
          token: token,
          restaurantId: restaurantId,
        })
        .then(result => {
          console.log('Status Wishlist: ', result);
          setIsLike(result.data);
          console.log('Status Wishlist', isLike);
        })
        .catch(function (error) {
          console.log('STATUS CHECKWISHLIST');
          console.log('Error', error);
          console.log('Response', error.response);
          console.log('Message', error.message);
          // alert('Check Status Wishlist');
        });
    } catch (error) {
      alert(error.message);
    }
  };

  const addHistory = async (token, restaurantId) => {
    console.log('History : ', token, restaurantId);
    try {
      const res = await axios
        .post('https://eatzyapp.herokuapp.com/history', {
          token: token,
          restaurantId: restaurantId,
        })
        .then(result => {
          console.log(result.data);
          // alert(result.data.msg);
        })
        .catch(function (error) {
          console.log('Error', error);
          console.log('Response', error.response);
          console.log('Message', error.message);
          alert('This restaurant already in your wishlist');
        });
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    getData();
    addHistory(userDetails.token, detailInfo.id);
    checkWishlist(userDetails.token, detailInfo.id);
  }, []);

  useEffect(() => {
    const refresh = navigation.addListener('focus', () => {
      getData();
    });
    return refresh;
  }, [navigation]);

  // useEffect(() => {
  //   checkWishlist();
  //   console.log('IS LIKE VAL', isLike);
  // }, [isLike]);

  const renderItem = ({item}) => (
    <ReviewCard
      review={item.review}
      rating={item.rating}
      imageUrl={item.imageURL}
      reviewTime={item.createdAt}
      name={item.username}
    />
  );
  // const renderItem = ({item}) => {
  //   console.log(item.review);
  // };

  return (
    <View>
      <ScrollView vertical={true} style={{height: '90%'}}>
        {/* <Header title="Union Deli" /> */}

        {/* Reastauran Image */}
        <View>
          <ImageBackground
            source={{
              uri: detailInfo.imageURL,
            }}
            style={{height: 275}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginHorizontal: 20,
                marginTop: 10,
              }}>
              <TouchableOpacity style={styles.ratingContainer}>
                <Image source={Star} style={{height: 20, width: 20}} />
                <Text style={styles.ratingText}>3.5</Text>
              </TouchableOpacity>
              {isLike ? (
                <TouchableOpacity
                  style={styles.saveContainer}
                  onPress={() => {
                    removeWishlist(userDetails.token, detailInfo.id);
                  }}>
                  <Image source={Like} style={{height: 20, width: 20}} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.saveContainer}
                  onPress={() => addWishlist(userDetails.token, detailInfo.id)}>
                  <Image source={Unlike} style={{height: 20, width: 20}} />
                </TouchableOpacity>
              )}
            </View>
          </ImageBackground>
        </View>

        {/* Restaurant Description */}
        <View style={[styles.wrapper, {paddingBottom: 20}]}>
          <TitleComp text={detailInfo.name} />

          <Text style={styles.address}>{detailInfo.address}</Text>

          <View style={styles.restaurantInfo}>
            <Image source={imgCuisine} style={{height: 24, width: 24}} />

            <View style={styles.restaurantInfoText}>
              <Text style={styles.infoText1}>Cuisine</Text>
              <Text style={styles.infoText2}>
                {detailInfo.categories.map(function (item, i, categories) {
                  if (categories.length === i + 1) {
                    return item['name'];
                  } else {
                    return item['name'] + ', ';
                  }
                })}
              </Text>
            </View>
          </View>

          <View style={styles.restaurantInfo}>
            <Image source={imgHour} style={{height: 24, width: 24}} />

            <View style={styles.restaurantInfoText}>
              <Text style={styles.infoText1}>Opening Hours</Text>
              <Text style={styles.infoText2}>{detailInfo.schedule}</Text>
            </View>
          </View>

          {/* Status */}
          <View style={styles.restaurantInfo}>
            <Image source={imgPrice} style={{height: 24, width: 24}} />
            <View style={styles.restaurantInfoText}>
              <Text style={styles.infoText1}>Price</Text>
              <Text style={styles.infoText2}>
                Rp. {detailInfo.priceRange} (approx.)
              </Text>
            </View>
          </View>
        </View>

        {/* Border Line*/}
        <View style={styles.line}></View>

        {/* Review */}
        <View style={styles.wrapper}>
          <View style={styles.reveiwHeader}>
            <TitleComp text="Review" />
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('AddReview', {
                  restaurantId: detailInfo.id,
                });
              }}>
              <Text style={{color: colors.blue}}>Write Review</Text>
            </TouchableOpacity>
          </View>

          {/* Review Card */}
          <View>
            <View style={styles.containerFlatList}>
              {data == '' ? (
                <Text>There is no comment yet</Text>
              ) : (
                <View></View>
              )}
              {isLoading ? (
                <ActivityIndicator size="large" style={{marginTop: 20}} />
              ) : (
                <FlatList
                  data={data}
                  renderItem={renderItem}
                  keyExtractor={({id}, index) => id}
                />
                // {data == '' ? (<Text>There is no review yet</Text>) : (               <FlatList
                //   data={data}
                //   renderItem={renderItem}
                //   keyExtractor={({id}, index) => id}
                // />)}
              )}
              {/* <Review /> */}
            </View>
          </View>

          {/* See All Reviews */}

          <TouchableOpacity
            onPress={() =>
              navigation.navigate('AllReviews', {
                passRestoId: detailInfo.id,
              })
            }>
            <Text style={styles.seeAllReviews}>See All Reviews</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {/* Menu & Direction */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => {
            navigation.navigate('RestoMenu', {
              passMenu: detailInfo.menuURL,
            });
          }}>
          <Text style={styles.menuText}>Menu</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.directionButton}
          onPress={() => {
            Linking.openURL(
              'https://www.google.com/maps/search/?api=1&query=' +
                encodeURI(detailInfo.name + ' ' + detailInfo.address),
            );
          }}>
          <Text style={styles.directionText}>Direction</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RestoDetail;

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: 10,
    paddingHorizontal: 20,
    display: 'flex',
    backgroundColor: colors.white,
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

  infoText1: {
    fontSize: 14,
    color: 'rgba(53, 53, 53, 0.75)',
    fontWeight: '400',
  },

  infoText2: {
    fontSize: 14,
    color: colors.grey,
    fontWeight: 'bold',
  },

  line: {
    borderStyle: 'solid',
    borderTopWidth: 10,
    borderColor: 'rgba(53, 53, 53, 0.15)',
  },

  reveiwHeader: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  containerList: {
    flex: 6,
    backgroundColor: colors.white,
  },

  containerFlatList: {
    flex: 1,
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

  address: {
    marginVertical: 10,
    fontSize: 14,
    color: colors.grey,
    textAlign: 'justify',
    lineHeight: 21,
    fontWeight: '400',
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

  description: {
    fontSize: 14,
    color: colors.grey,
    fontWeight: '400',
    textAlign: 'justify',
    lineHeight: 21,
    width: '70%',
  },

  ratingContainer: {
    backgroundColor: colors.white,
    width: 60,
    height: 30,
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },

  ratingText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.grey,
  },

  saveContainer: {
    backgroundColor: colors.white,
    width: 35,
    height: 35,
    borderRadius: 100,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
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

  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  seeAllReviews: {
    color: colors.blue,
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },

  menuButton: {
    width: '45%',
    paddingVertical: 10,
    backgroundColor: colors.yellow,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  menuText: {
    color: colors.grey,
    fontSize: 16,
    fontWeight: 'bold',
  },

  directionButton: {
    width: '45%',
    paddingVertical: 10,
    backgroundColor: colors.blue,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  directionText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },

  footer: {
    backgroundColor: colors.white,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
