import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, ScrollView, Alert } from 'react-native';
import Constants from 'expo-constants';

import * as Font from 'expo-font';
import { AppLoading } from 'expo';

import axios from 'axios'



let customFonts = {
  'IRANSans': require('../assets/fonts/IRANSans.ttf'),
  'IRANSans-bold': require('../assets/fonts/IRANSans-bold.ttf'),
};

export default function List() {

    const [fontsLoaded, setFontsLoaded] = useState(false);

    const [users, setUsers] = useState(null);

    useEffect(() => {

        const _loadFontsAsync = async () => {
            await Font.loadAsync(customFonts);
            setFontsLoaded(true);
        }


        const sendData = () => {
            axios({
                method: 'get',
                url: "http://stage.achareh.ir/api/karfarmas/address",
        
                headers: {
                  Username: '09822222222',
                  Password: 'sana1234',
                },
        
            })
        
            .then(function (response) {
              setUsers(response.data)
            })
        
            .catch(function (error) {
              setUsers([
                  {
                    first_name: 'Reza',
                    last_name: 'Ghovati',
                    coordinate_mobile: '09107780374',
                    address: 'My Home',
          
                  }
                ])
              Alert.alert("دریافت اطلاعات کاربران از سرور با خطا مواجه شد.")
            })
        
          }

          sendData()

          _loadFontsAsync()
        
    },[]);


    if (fontsLoaded && users) { 
        return (
            <ScrollView style={styles.Container}>
                {users.map( (val, index) => {
                  return <View key={index} style={styles.itemContainer}>
                    <Text style={styles.itemText} >نام: {val.first_name}</Text>
                    <Text style={styles.itemText} >نام خانوادگی: {val.last_name}</Text>
                    <Text style={styles.itemText} >شماره همراه: {val.coordinate_mobile}</Text>
                    <Text style={styles.itemText} >آدرس: {val.address}</Text>
                  </View>
                })}
            </ScrollView>
        );
    }
    
    else {
        return <AppLoading />
      ;
    }
    
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: Constants.statusBarHeight,
  },
  itemContainer: {
    backgroundColor: '#f9c2ff',
    padding: 16,
    marginTop: 16,
    marginHorizontal: 16,
    borderRadius: 12,
    borderWidth: 0,
    // boxShadow: '',

  },
  title: {
    fontSize: 32,
  },

  itemText: {
    fontFamily: 'IRANSans',
    textAlign: 'right',
  }
});
