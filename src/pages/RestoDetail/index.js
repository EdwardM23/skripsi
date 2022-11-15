import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import TitleComp from '../../component/TitleComp';
import imgPrice from '../../images/Price.png';
import imgCuisine from '../../images/Cuisine.png';
import imgHour from '../../images/Hour.png';

const RestoDetail = () => {
  return (
    // <View style={{height: '100%'}}>
    //   {/* <ScrollView> */}
    //   <View style={{height: '30%'}}>
    //     <Image
    //       source={{
    //         uri: 'https://awsimages.detik.net.id/community/media/visual/2020/10/20/bukan-romantis-lampu-remang-remang-di-restoran-bikin-makanan-tak-enak_169.png?w=700&q=90',
    //       }}
    //       style={{height: '105%'}}
    //     />
    //   </View>
    //   <View style={styles.wrapper}>
    //     <TitleComp text="Wing Heng" />
    //     <Text>
    //       Loremipsun dolor sitamet Loremipsun dolor sitamet Loremipsun dositamet
    //       Loremipsun dolor sitamet
    //     </Text>
    //   </View>

    // {/* </ScrollView> */}
    // </View>
    <ScrollView vertical={true}>
      {/* Reastauran Image */}
      <Image
        source={{
          uri: 'https://awsimages.detik.net.id/community/media/visual/2020/10/20/bukan-romantis-lampu-remang-remang-di-restoran-bikin-makanan-tak-enak_169.png?w=700&q=90',
        }}
        style={{height: 200}}
      />
      {/* Restaurant Description */}
      <View style={[styles.wrapper, {paddingBottom: 20}]}>
        <TitleComp text="Wing Heng" />
        <Text style={{marginVertical: 10}}>
          Loremipsun dolor sitamet Loremipsun dolor sitamet Loremipsun dositamet
          Loremipsun dolor sitamet
        </Text>
        <View style={styles.restaurantInfo}>
          <Image source={imgCuisine} style={{height: 24, width: 24}} />
          <View style={styles.restaurantInfoText}>
            <Text style={styles.infoText}>Cuisine</Text>
            <Text style={styles.infoText}>Western</Text>
          </View>
        </View>
        <View style={styles.restaurantInfo}>
          <Image source={imgHour} style={{height: 24, width: 24}} />
          <View style={styles.restaurantInfoText}>
            <Text style={styles.infoText}>Cuisine</Text>
            <Text style={styles.infoText}>Western</Text>
          </View>
        </View>
        {/* Status */}
        <View style={styles.restaurantInfo}>
          <Image source={imgPrice} style={{height: 24, width: 24}} />
          <View style={styles.restaurantInfoText}>
            <Text style={styles.infoText}>Cuisine</Text>
            <Text style={styles.infoText}>Western</Text>
          </View>
        </View>
      </View>
      {/* Border Line*/}
      <View style={styles.line}></View>
      {/* Review */}
      <View style={styles.wrapper}>
        <View style={styles.reveiwHeader}>
          <TitleComp text="Review" />
          <TouchableOpacity>
            <Text>View All</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text>Ini bagian Revieqw</Text>
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
    backgroundColor: '#ffffff',
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
  infoText: {
    fontSize: 14,
  },
  line: {
    borderStyle: 'solid',
    borderTopWidth: 10,
    borderColor: '#EDEDED',
  },
  reveiwHeader: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
