import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import TitleComp from '../../component/TitleComp';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import Header from '../../component/Header'
import {colors} from "../../global/styles"

const RestauranList = () => {
  return (
    <View>
      <Header title = "Restaurant"/>

      <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={{height: '40%'}}
        region={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}>
      </MapView>

      <View style={styles.wrapper}>
        <View style={styles.containerList}>
          <Text style={styles.filterFont}>FILTER</Text>

          {/* Item Resto */}
          <View style={styles.containerFlatList}>

            <View style={styles.item}>
              <View style={{position: 'relative', width: '100%'}}>
                <Image
                  source={{
                    uri: 'https://awsimages.detik.net.id/community/media/visual/2020/10/20/bukan-romantis-lampu-remang-remang-di-restoran-bikin-makanan-tak-enak_169.png?w=700&q=90',
                  }}
                  style={{height: 150, borderRadius: 10}}
                />

                <View style={styles.rating_review}>
                  <Text>Rating / review</Text>
                </View>
              </View>

              <View style={{width: '100%'}}>
                <View style={styles.row}>
                  <View style={{textAlign: 'right'}}>
                    <Text style={styles.restoFont}>
                      Wingheng
                    </Text>
                  </View>

                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image
                      source={{
                        uri: 'https://www.iconpacks.net/icons/2/free-location-pointer-icon-2961-thumb.png',
                      }}
                      style={{width: 9, height: 13, marginRight: 2}}
                    />

                    <Text style={{fontSize: 12, color: 'black'}}>12 KM</Text>
                  </View>
                </View>

                <View style={styles.row}>
                  <View>
                    <Text style={{fontSize: 12, color: 'black'}}>
                      Indonesia <Text style={styles.status}>Status</Text>
                    </Text>
                  </View>

                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{fontSize: 12, color: 'black'}}>
                      Price Rp 250 000 fo tow
                    </Text>
                  </View>
                </View>
              </View>

            </View>
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
    color: 'red',
    fontWeight: 'bold',
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
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
    marginBottom: 10
  },

  restoFont: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.grey
  }
});
