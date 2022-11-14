import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import TitleComp from '../../component/TitleComp';

const RestoDetail = () => {
  return (
    <View style={{height: '100%'}}>
      {/* <ScrollView> */}
      <View style={{height: '30%'}}>
        <Image
          source={{
            uri: 'https://awsimages.detik.net.id/community/media/visual/2020/10/20/bukan-romantis-lampu-remang-remang-di-restoran-bikin-makanan-tak-enak_169.png?w=700&q=90',
          }}
          style={{height: '105%'}}
        />
      </View>
      <View style={styles.wrapper}>
        <TitleComp text="Wing Heng" />
        <Text>
          Loremipsun dolor sitamet Loremipsun dolor sitamet Loremipsun dositamet
          Loremipsun dolor sitamet
        </Text>
      </View>

      {/* </ScrollView> */}
    </View>
  );
};

export default RestoDetail;

const styles = StyleSheet.create({
  wrapper: {
    padding: 10,
    display: 'flex',
    height: '60%',
    backgroundColor: '#ffffff',
  },
});
