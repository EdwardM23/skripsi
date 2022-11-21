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
import {colors} from "../../global/styles"

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
        {/* <TitleComp text="Station List"/> */}
        <Text style={styles.titleFont}>
          Station List
        </Text>

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
    backgroundColor: colors.white,
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },

  input: {
    height: 50,
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 15,
    padding: 10,
    fontSize: 16,
    borderColor: colors.blue,
  },

  containerCover: {
    flex: 3, zIndex: -1
  },

  containerSearch: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'center',
  },

  containerListStation: {
    flex: 6,
    backgroundColor: colors.white,
  },

  containerFlatList: {
    flex: 1,
  },

  item: {
    backgroundColor: colors.white,
    padding: 20,
    marginVertical: 8,
    display: 'flex',
    flexDirection: 'row',
    shadowColor: colors.grey,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 15
  },

  titleFont:{
    fontSize: 24,
    fontWeight: '700',
    color: colors.blue,
    marginTop: 20,
    marginBottom: 20
  }
});
