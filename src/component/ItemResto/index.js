import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colors} from '../../global/styles';
import Star from '../../images/star.png';
import people from '../../images/people.png';
import axios from 'axios';

const rating = 0;
const countReview = 0;

const ItemResto = ({
  restoId,
  name,
  schedule,
  imageUrl,
  priceRange,
  walkDist,
  restoPress,
}) => {
  const [rating, setRating] = useState('');

  const getAvgRating = async id => {
    console.log('ID avg rating', id);

    try {
      const res = await axios.get(
        'https://eatzyapp.herokuapp.com/review/average/' + id,
      );
      console.log('res AVG Rating', res.data[0]);
      console.log(res);
      setRating(res.data[0]);
      console.log(rating);
    } catch (error) {
      alert(error.message);
    } finally {
    }
  };

  useEffect(() => {
    getAvgRating(restoId);
  }, []);

  return (
    <View>
      <TouchableOpacity style={styles.item} onPress={restoPress}>
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
              {/* <View style={styles.ratingContainer}>
                <Image source={Star} style={{height: 15, width: 15}} /> */}
              {rating.averageRating == null ? (
                <>
                  <View></View>
                </>
              ) : (
                <>
                  <View style={styles.ratingContainer}>
                    <Image source={Star} style={{height: 15, width: 15}} />
                    <Text style={styles.ratingText}>
                      {parseFloat(rating.averageRating).toFixed(1)}
                    </Text>
                    <Image source={people} style={{height: 10, width: 10}} />
                    <Text style={styles.count}>{rating.countReview}</Text>
                  </View>
                </>
              )}

              {/* <Text style={styles.count}>({rating.countReview})</Text>
              </View> */}
            </View>
          </ImageBackground>
        </View>
        <View style={{width: '100%', marginTop: 5}}>
          <View style={styles.row}>
            <View style={{textAlign: 'right'}}>
              <Text style={styles.restoFont}>{name}</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              {walkDist != '' ? (
                <>
                  <Image
                    source={{
                      uri: 'https://www.iconpacks.net/icons/2/free-location-pointer-icon-2961-thumb.png',
                    }}
                    style={{width: 9, height: 13, marginRight: 4}}
                  />
                  <Text style={styles.distanceFont}>{walkDist} m</Text>
                </>
              ) : (
                <View></View>
              )}
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
                Rp. {priceRange}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ItemResto;

const styles = StyleSheet.create({
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
  ratingContainer: {
    backgroundColor: colors.white,
    width: 80,
    height: 30,
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.grey,
  },
  count: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.grey,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 2,
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
});
