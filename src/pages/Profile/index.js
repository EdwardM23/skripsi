import React from 'react';
import {View, Text, StyleSheet, ScrollView, Image, TouchableOpacity} from 'react-native'
import Header from '../../component/Header'
import {colors} from "../../global/styles"
import profilePicture from '../../images/profile.png'
import logout from '../../images/logout.png'

const Profile = () => {
    return(
        <View style = {styles.container}>
            <Header title = "Account"/>
            
            <ScrollView>
                {/* Account */}
                <View style={styles.borderContainer}>
                    <View style={styles.leftContainer}>
                        <View>
                            <Image 
                                source={profilePicture}
                                style={{width: 70, height: 70}}
                            />
                        </View>
                        
                        <View style={{marginLeft: 10}}>
                            <Text style={styles.username}>Kelly</Text>
                            <Text style={styles.email}>kelly@gmail.com</Text>
                        </View>
                    </View>
                    
                    <View>
                        <TouchableOpacity>
                            <Image 
                                source={logout}
                                style={{width: 20, height: 20}}
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Wishlist */}
                <Text style={styles.title}>Your Wishlist</Text>
            </ScrollView>
        </View>
    );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    // flex:1,
    backgroundColor: colors.white
  },

  title: {
    color: colors.grey,
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 30,
    marginTop: 30
  },

  borderContainer: {
    borderWidth: 1,
    width: 350,
    height: 100,
    borderRadius: 15,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginLeft: 30,
    flexDirection: 'row'
  },

  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 50
  },

  username: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.grey
  },

  email: {
    fontSize: 18,
    fontWeight: '400',
    color: colors.grey
  }
})