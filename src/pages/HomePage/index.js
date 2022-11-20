import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import cover from '../../images/smallCover.png';
import TitleComp from '../../component/TitleComp';
import axios from 'axios';

const Item = ({stasiunName, tipeTransportasi, imageSource}) => (
  <TouchableOpacity style={styles.item}>
    <View>
      <Image
        source={{uri: imageSource}}
        style={{width: 50, height: 50, marginRight: 20}}
      />
      {/* <Text style={{fontSize: 18, fontWeight: 'bold'}}>{imageSource}</Text> */}
    </View>
    <View>
      <Text style={{fontSize: 18, fontWeight: 'bold'}}>{stasiunName}</Text>
      <Text style={{fontSize: 14}}>{tipeTransportasi}</Text>
    </View>
  </TouchableOpacity>
);

const HomePage = () => {
  const [isLoading, setLoading] = useState(true);
  const [text, onChangeText] = React.useState('');
  const [data, serData] = useState();

  const getData = async () => {
    try {
      const res = await axios.get('https://eatzyapp.herokuapp.com/station');
      serData(res.data);
      //   console.log(res.data);
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
    <Item
      stasiunName={item.name}
      tipeTransportasi={item.station_category.name}
      imageSource={item.station_category.image}
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
          {isLoading ? (
            <ActivityIndicator size="large" style={{marginTop: 20}} />
          ) : (
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={({id}, index) => id}
              nestedScrollEnabled
            />
          )}
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
