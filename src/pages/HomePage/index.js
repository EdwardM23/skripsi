import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React from 'react';
import cover from '../../images/smallCover.png';
import TitleComp from '../../component/TitleComp';

const DATA = [
  {
    id: '1',
    stasiunName: 'Senayan',
    tipeTransportasi: 'MRT',
    imageSource:
      'https://toppng.com//public/uploads/preview/mrt-jakarta-graphic-desi-11563131435lo3ybgblf2.png',
  },
  {
    id: '2',
    stasiunName: 'ASEAN',
    tipeTransportasi: 'MRT',
    imageSource:
      'https://toppng.com//public/uploads/preview/mrt-jakarta-graphic-desi-11563131435lo3ybgblf2.png',
  },
  {
    id: '3',
    stasiunName: 'Gambir',
    tipeTransportasi: 'KRL',
    imageSource:
      'https://toppng.com//public/uploads/preview/mrt-jakarta-graphic-desi-11563131435lo3ybgblf2.png',
  },
  {
    id: '4',
    stasiunName: 'Tosari',
    tipeTransportasi: 'Transajakrta',
    imageSource:
      'https://toppng.com//public/uploads/preview/mrt-jakarta-graphic-desi-11563131435lo3ybgblf2.png',
  },
  {
    id: '5',
    stasiunName: 'Gambir',
    tipeTransportasi: 'Transajakrta',
    imageSource:
      'https://toppng.com//public/uploads/preview/mrt-jakarta-graphic-desi-11563131435lo3ybgblf2.png',
  },
];

const Item = ({stasiunName, tipeTransportasi, imageSource}) => (
  <View style={styles.item}>
    <View>
      <Image
        source={{uri: imageSource}}
        style={{width: 50, height: 50, borderRadius: 50, marginRight: 20}}
      />
      {/* <Text style={{fontSize: 18, fontWeight: 'bold'}}>{imageSource}</Text> */}
    </View>
    <View>
      <Text style={{fontSize: 18, fontWeight: 'bold'}}>{stasiunName}</Text>
      <Text style={{fontSize: 14}}>{tipeTransportasi}</Text>
    </View>
  </View>
);

const HomePage = () => {
  const [text, onChangeText] = React.useState('');

  const renderItem = ({item}) => (
    <Item
      stasiunName={item.stasiunName}
      tipeTransportasi={item.tipeTransportasi}
      imageSource={item.imageSource}
    />
  );

  return (
    <View style={styles.wrapper}>
      {/* <View style={styles.header}>
        <Text>Hello I am Kelly</Text>
        <Text>Gamabr</Text>
      </View> */}
      <View style={styles.containerCover}>
        <Image source={cover} />
      </View>
      <View style={styles.containerSearch}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
          placeholder="Search..."
        />
      </View>
      <View style={styles.containerListStation}>
        <TitleComp text="List Stasiun" />

        <View style={styles.containerFlatList}>
          <FlatList
            data={DATA}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            nestedScrollEnabled
          />
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
    backgroundColor: '#ffffff',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  textTitle: {
    fontSize: 20,
  },
  input: {
    height: 40,
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 12,
    padding: 10,
  },
  containerCover: {flex: 3, zIndex: -1},
  containerSearch: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
  },
  containerListStation: {
    flex: 6,
    backgroundColor: '#ffffff',
  },
  containerFlatList: {
    flex: 1,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    display: 'flex',
    flexDirection: 'row',
  },
  title: {
    fontSize: 32,
  },
});
