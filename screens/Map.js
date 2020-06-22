import React, { useState, useEffect } from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Alert, TouchableHighlight, Modal } from 'react-native';

import * as Font from 'expo-font';
import { AppLoading } from 'expo';

import axios from 'axios'

import { connect } from 'react-redux'
// import { personalInfo } from '../redux/actions'


let customFonts = {
  'IRANSans': require('../assets/fonts/IRANSans.ttf'),
  'IRANSans-bold': require('../assets/fonts/IRANSans-bold.ttf'),
};

function Map({navigation, data}) {
  
  const [fontsLoaded, setFontsLoaded] = useState(false);

  // const [dataSent, setDataSent] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);

  const [region, setRegion] = useState(
    {
      latitude: 35.769848,
      longitude: 51.356878,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }
  );


  useEffect(() => {
    const _loadFontsAsync = async () => {
      await Font.loadAsync(customFonts);
      setFontsLoaded(true);
    }

    _loadFontsAsync()
    
  },[]);

  const sendData = () => {
    axios({
        method: 'post',
        url: "http://stage.achareh.ir/api/karfarmas/address",

        headers: {
            Username: '09822222222',
            Password: 'sana1234',
        },

        data: {
          region: 1,
          address: data.address,
          lat: "35.7717503",
          lng: "51.3365315",
          coordinate_mobile: data.mobile,
          coordinate_phone_number: data.phone,
          first_name: data.name,
          last_name: data.lastName,
          gender: data.gender

        }
    })

    .then(function (response) {
      navigation.navigate('List')
    })

    .catch(function (error) {
      // Alert.alert("متوسفانه ارتباط با سرور برقرار نشد. لطفا اتصالات اینترنت خود را بررسی کنید")
      // navigation.navigate('List')
      setModalVisible(true)
    })

  }

  const onRegionChange = (region) => {
    setRegion(region)
  }


  if (fontsLoaded) { 
    return (
      <View style={styles.container}>
        
        <MapView
          style={styles.mapStyle}
          initialRegion={region}
          showsUserLocation={true}
          // onMapReady={this.onMapReady}
          onRegionChangeComplete={onRegionChange}
        >
  
        <MapView.Marker
          coordinate={{ "latitude": region.latitude,   
          "longitude": region.longitude }}
          title={"Your Location"}
          draggable 
        />
  
        </MapView>

        <View style={styles.titleContainer} ><Text style={styles.title}>لطفا موقعیت مورد نظر را بر روی نقشه مشخص کنید.</Text></View>
  
        <TouchableOpacity
          style={styles.submit}
          onPress={() => sendData()}
        >
          <Text style={{fontFamily: 'IRANSans', fontSize: 20, color: '#ffffff'}}>ثبت موقعیت</Text>
        </TouchableOpacity>

        <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              
              <Text style={styles.modalText}>متوسفانه ارتباط با سرور برقرار نشد. لطفا اتصالات اینترنت خود را بررسی کنید</Text>

              <View style={{flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'flex-start'}} >
                <TouchableHighlight
                  style={styles.openButton}
                  onPress={() => {
                    setModalVisible(!modalVisible);
                    sendData()
                  }}
                >
                  <Text style={styles.textStyle}>تلاش مجدد</Text>
                </TouchableHighlight>

                <TouchableHighlight
                  style={{...styles.openButton, backgroundColor: '#e74c3c'}}
                  onPress={() => {
                    setModalVisible(!modalVisible);
                    navigation.navigate('List')
                  }}
                >
                  <Text style={styles.textStyle}>دیدن صفحه بعدی</Text>
                </TouchableHighlight>
              </View>
              
              
            </View>
          </View>
        </Modal>
  
      </View>
    );
  }

  else {
    return <AppLoading />;
  }
  
}

const mapStateToProps = (state) => ({
  data: state.data,
})

const mapDispatchToProps = (dispatch) => ({
  dispatch: dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(Map)



const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  titleContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 52,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    opacity: 0.85,
  },
  title: {
    color: '#333',
    textAlign: 'center',
    fontSize: 17,
    fontFamily: 'IRANSans'
  },

  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  submit: {
    position: 'absolute',
    bottom: 32,
    right: 16,
    left: 16,
    backgroundColor: '#13da97',
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8
  },


  


  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16
  },
  modalView: {
    margin: 16,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    // alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },

  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontFamily: 'IRANSans'
  },

  openButton: {
    backgroundColor: "#2196F3",
    borderRadius: 8,
    padding: 10,
    elevation: 2
  },

  textStyle: {
    color: "white",
    textAlign: "center",
    fontFamily: 'IRANSans-bold'
  },
  
  
});