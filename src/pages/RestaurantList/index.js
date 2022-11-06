import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const RestauranList = () => {
  return (
    <View style={styles.item}>
      <View>
        <Image
          source={{
            uri: 'https://awsimages.detik.net.id/community/media/visual/2020/10/20/bukan-romantis-lampu-remang-remang-di-restoran-bikin-makanan-tak-enak_169.png?w=700&q=90',
          }}
          style={{height: 150, borderRadius: 10}}
        />
        {/* <Text style={{fontSize: 18, fontWeight: 'bold'}}>{imageSource}</Text> */}
      </View>
      <View style={{width: '100%'}}>
        <View style={styles.row}>
          <View>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>Wingheng</Text>
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
  );
};

export default RestauranList;

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    display: 'flex',
    width: '100%',
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
});
