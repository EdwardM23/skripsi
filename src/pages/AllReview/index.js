import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import Profile from '../../images/profile.png';
import Star from '../../images/star.png';
import {colors} from '../../global/styles';

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
            <Text style={styles.reviewText2}>{reviewTime}</Text>
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

const AllReviews = ({route, navigation}) => {
  const retoID = route.params.passRestoId;
  const [data, setData] = useState('');
  const [isLoading, setLoading] = useState(true);

  const getData = async () => {
    try {
      const res = await axios.get(
        'https://eatzyapp.herokuapp.com/review/restaurant/' + retoID,
      );
      console.log('Data response', res.data.rows);
      const response = res.data.rows;
      setData(res.data.rows);
      console.log('Data', data);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const renderItem = ({item}) => (
    <ReviewCard
      review={item.review}
      rating={item.rating}
      imageUrl={item.imageURL}
      reviewTime={item.createdAt}
      name={item.username}
    />
  );

  return (
    <View>
      <View style={styles.wrapper}>
        <View style={styles.containerFlatList}>
          <ReviewCard
            review={'TESTING'}
            rating={'TESTING'}
            imageUrl={''}
            reviewTime={'TESTING'}
            name={'TESTING'}
          />
          {/* {data == '' ? <Text>There is no comment yet</Text> : <View></View>}
            {isLoading ? (
              <ActivityIndicator size="large" style={{marginTop: 20}} />
            ) : (
              <FlatList
                data={data}
                renderItem={({item}) => (
                  <View
                    style={{
                      backgroundColor: '#f9c2ff',
                      padding: 20,
                      marginVertical: 8,
                      display: 'flex',
                      flexDirection: 'row',
                    }}>
                    <Text>{item.username}</Text>
                  </View>
                )}
                keyExtractor={({id}, index) => id}
              />
            )} */}
        </View>
      </View>
    </View>
  );
};

export default AllReviews;

const styles = StyleSheet.create({
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
