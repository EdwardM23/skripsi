import {Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import TitleComp from '../../component/TitleComp';
import imgPrice from '../../images/Price.png';
import imgCuisine from '../../images/Cuisine.png';
import imgHour from '../../images/Hour.png';
import Header from '../../component/Header'
import {colors} from "../../global/styles"
import Profile from '../../images/profile.png'
import Star from '../../images/star.png'
import Like from '../../images/like.png'
import Unlike from '../../images/unlike.png'

const RestoDetail = () => {
  return (
    <ScrollView vertical={true}>
      <Header title = "Union Deli"/>

      {/* Reastauran Image */}
      <View>
        <ImageBackground
          source={{
            uri: 'https://b.zmtcdn.com/data/reviews_photos/0de/20127881d1f483945fe2fcf6cab6a0de_1637193371.jpg',
          }}
          style={{height: 275}}
        >
          <View style={{flexDirection: 'row', justifyContent: 'space-between', marginLeft: 10, marginRight: 10, marginTop: 10}}>
            <TouchableOpacity style={styles.ratingContainer}>
              <Image
                source={Star}
                style={{height: 20, width: 20}}
              />
              <Text style={styles.ratingText}>3.5</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveContainer}>
              <Image
                source={Like}
                style={{height: 20, width: 20}}
              />
            </TouchableOpacity>
          </View>

        </ImageBackground>
      </View>

      {/* Restaurant Description */}
      <View style={[styles.wrapper, {paddingBottom: 20}]}>
        <TitleComp text="Union Deli" />

        <Text style={styles.address}>
          Grand Indonesia Mall, East Mall, Lantai Ground, Jl. M. H. Thamrin No. 1, Thamrin, Jakarta
        </Text>

        <View style={styles.restaurantInfo}>
          <Image source={imgCuisine} style={{height: 24, width: 24}} />

          <View style={styles.restaurantInfoText}>
            <Text style={styles.infoText1}>Cuisine</Text>
            <Text style={styles.infoText2}>Western</Text>
          </View>
        </View>

        <View style={styles.restaurantInfo}>
          <Image source={imgHour} style={{height: 24, width: 24}} />

          <View style={styles.restaurantInfoText}>
            <Text style={styles.infoText1}>Opening Hours</Text>
            <Text style={styles.infoText2}>Mon-Sun: 11am-9pm</Text>
          </View>
        </View>

        {/* Status */}
        <View style={styles.restaurantInfo}>
          <Image source={imgPrice} style={{height: 24, width: 24}} />
          <View style={styles.restaurantInfoText}>
            <Text style={styles.infoText1}>Price</Text>
            <Text style={styles.infoText2}>Cost for two - Rp 150.000 (approx.)</Text>
          </View>
        </View>
      </View>

      {/* Border Line*/}
      <View style={styles.line}></View>

      {/* Review */}
      <View style={styles.wrapper}>
        <View style={styles.reveiwHeader}>
          <TitleComp text="Review" />
        </View>

        {/* Review Card */}
        <View>
          <View style={styles.containerFlatList}>
            <View style={styles.item}>

              <View style={styles.cardHeader}>
                <View style={styles.restaurantInfo}>
                  <Image
                    source={Profile}
                    style={{height: 35, width: 35, borderRadius: 35}}
                  />

                  <View style={styles.restaurantInfoText}>
                    <Text style={styles.reviewText1}>
                      Matthew
                    </Text>

                    <View style={{flexDirection:'row'}}>
                      <Text style={styles.reviewText2}>
                        18 September 2022 06.45 PM
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={styles.reviewRate}>
                  <Image
                    source={Star}
                    style={{height: 15, width: 15}}
                  />
                  <Text style={{fontSize: 14, fontWeight: '600', color: colors.grey}}>3.5</Text>
                </View>
              </View>

              <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.description}>
                  Makanan enak, tempat cozy, mantep! Lain kali bakal balik lagi ke sini. 
                </Text>

                <Image
                  source={{
                    uri: 'https://b.zmtcdn.com/data/reviews_photos/0de/20127881d1f483945fe2fcf6cab6a0de_1637193371.jpg',
                  }}
                  style={{width: 100, height: 100, borderRadius: 15}}
                />
              </View>
            </View>
          </View>
        </View>

        {/* See All Reviews */}

        <TouchableOpacity >
          <Text style={styles.seeAllReviews}>See All Reviews</Text>
        </TouchableOpacity>
        
        {/* Menu & Direction */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.menuButton}>
            <Text style={styles.menuText}>Menu</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.directionButton}>
            <Text style={styles.directionText}>Direction</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
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
    fontWeight: '400'
  },

  infoText2: {
    fontSize: 14,
    color: colors.grey,
    fontWeight: '600'
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
    fontWeight: '400'
  },

  reviewText1: {
    fontSize: 14,
    color: colors.grey,
    fontWeight: '600'
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
    marginTop: 10,
    width: 235
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
    fontWeight: '600',
    color: colors.grey
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
    justifyContent: 'space-between'
  },

  seeAllReviews: {
    color: colors.blue,
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
    textAlign: 'center',
  },

  menuButton: {
    width: 150,
    height: 40,
    backgroundColor: colors.red,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },

  menuText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600'
  },

  directionButton: {
    width: 150,
    height: 40,
    backgroundColor: colors.yellow,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },

  directionText: {
    color: colors.grey,
    fontSize: 16,
    fontWeight: '600'
  },

  footer: {
    backgroundColor: colors.white,
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  }
});
