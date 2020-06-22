import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TextInput, Button, TouchableWithoutFeedback, TouchableOpacity, KeyboardAvoidingView, ScrollView, Dimensions  } from 'react-native';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { AntDesign } from '@expo/vector-icons'; 

import { connect } from 'react-redux'
import { personalInfo } from '../redux/actions'


let customFonts = {
  'IRANSans': require('../assets/fonts/IRANSans.ttf'),
  'IRANSans-bold': require('../assets/fonts/IRANSans-bold.ttf'),
};

function HomeScreen({ navigation, dispatch }) {

  const [fontsLoaded, setFontsLoaded] = useState(false);

  const [name, setName] = useState('');
  const [isNameValid, setIsNameValid] = useState(false)

  const [lName, setLName] = useState('');
  const [isLNameValid, setIsLNameValid] = useState(false)

  const [mobile, setMobile] = useState('');
  const [isMobileValid, setIsMobileValid] = useState(false)

  const [phone, setPhone] = useState('');
  const [isPhoneValid, setIsPhoneValid] = useState(false)

  const [address, setAddress] = useState('');
  const [isAddressValid, setIsAddressValid] = useState(false)

  const [clicked, setClicked] = useState(false);

  const [gender, setGender] = useState('man');

  useEffect(() => {
      const _loadFontsAsync = async () => {
        await Font.loadAsync(customFonts);
        setFontsLoaded(true);
      }

      _loadFontsAsync()
      
  },[]);

  const handleName = (text) => {
    setName(text)
    if (text.length >= 3 ) {
      setIsNameValid(true)
    } 
    else {
      setIsNameValid(false)
    }
  }

  const handleLName = (text) => {
    setLName(text)
    if (text.length >= 3 ) {
      setIsLNameValid(true)
    } 
    else {
      setIsLNameValid(false)
    }
  }

  const handleMobile = (text) => {
    if (text.length <= 11 ) {
      setMobile(text)
      if (text.length == 11 ) {
        setIsMobileValid(true)
      } 
      else {
        setIsMobileValid(false)
      }
    }
    
  }

  const handlePhone = (text) => {
    if (text.length <= 11 ) {
      setPhone(text)
      if (text.length == 11 ) {
        setIsPhoneValid(true)
      } 
      else {
        setIsPhoneValid(false)
      }
    }
    
  }

  const handleAddress = (text) => {
    setAddress(text)
    if (text.length >= 10 ) {
      setIsAddressValid(true)
    } 
    else {
      setIsAddressValid(false)
    }
  }

  const selectMan = () => {
    setGender('man')
  }

  const selectWoman = () => {
    setGender('woman')
  }

  const validation = () => {
    if (isAddressValid && isPhoneValid && isMobileValid && isLNameValid && isNameValid) {
      dispatch(personalInfo({
        name: name,
        lastName: lName,
        mobile: mobile,
        phone: phone,
        address: address,
        gender: gender
      }));
      navigation.navigate('Map')
    }
    else {
      setClicked(true)
    }
  }

    if (fontsLoaded) {
      return (

        <View  style={styles.container}>
        <ScrollView  style={styles.container}>

          <View style={styles.titleContainer}>
            <Text style={styles.title}>
              لطفا اطلاعات خود را وارد نمایید.
            </Text>
          </View>

          <View style={styles.werapper}>

            <View style={{...styles.inputContainer, borderColor: `${clicked && !isNameValid?"red":"#e7e7e7"}`}}>
              <Text style={styles.inputTitle}>
                نـام
              </Text>
              <TextInput
                style={styles.input}
                onChangeText={text => handleName(text)}
                value={name}
              />
              <View style={{width: '10%', alignItems: 'center'}}><View style={{...styles.point, backgroundColor: `${isNameValid?"#13da97":"#e8e8e8"}`}}><AntDesign name="check" size={12} color="white" style={{ display: `${isNameValid?'flex':'none'}` }}/></View></View>
            </View>

            <View style={{...styles.inputContainer, borderColor: `${clicked && !isLNameValid?"red":"#e7e7e7"}`}}>
              <Text style={styles.inputTitle}>
                نام خانوادگی
              </Text>
              <TextInput
                style={styles.input}
                onChangeText={text => handleLName(text)}
                value={lName}
              />
              <View style={{width: '10%', alignItems: 'center'}}><View style={{...styles.point, backgroundColor: `${isLNameValid?"#13da97":"#e8e8e8"}`}}><AntDesign name="check" size={12} color="white" style={{ display: `${isLNameValid?'flex':'none'}` }}/></View></View>
            </View>

            <View style={{...styles.inputContainer, borderColor: `${clicked && !isMobileValid?"red":"#e7e7e7"}`}}>
              <Text style={styles.inputTitle}>
                تلفن همراه
              </Text>
              <TextInput
                style={styles.input}
                keyboardType="phone-pad"
                onChangeText={text => handleMobile(text)}
                value={mobile}
              />
              <View style={{width: '10%', alignItems: 'center'}}><View style={{...styles.point, backgroundColor: `${isMobileValid?"#13da97":"#e8e8e8"}`}}><AntDesign name="check" size={12} color="white" style={{ display: `${isMobileValid?'flex':'none'}` }}/></View></View>
            </View>

            <View style={{...styles.inputContainer, borderColor: `${clicked && !isPhoneValid?"red":"#e7e7e7"}`}}>
              <Text style={styles.inputTitle}>
                تلفن ثابت
              </Text>
              <TextInput
                style={styles.input}
                keyboardType="phone-pad"
                onChangeText={text => handlePhone(text)}
                value={phone}
              />
              <View style={{width: '10%', alignItems: 'center'}}><View style={{...styles.point, backgroundColor: `${isPhoneValid?"#13da97":"#e8e8e8"}`}}><AntDesign name="check" size={12} color="white" style={{ display: `${isPhoneValid?'flex':'none'}` }}/></View></View>
            </View>
            
          </View>

          <View style={styles.divider}></View>


          <View style={{...styles.werapper, marginTop: 28}}>
            <View style={{ flexDirection: 'row-reverse' }}><Text style={{...styles.inputTitle}}>آدرس دقیق</Text></View>
            <View style={{...styles.inputContainer, marginTop: 8, borderColor: `${clicked && !isAddressValid?"red":"#e7e7e7"}`}}>
              <TextInput
                style={{width: '90%', alignSelf: 'stretch', textAlign: 'right'}}
                onChangeText={text => handleAddress(text)}
                value={address}
              />
              <View style={{width: '10%', alignItems: 'center'}}><View style={{...styles.point, backgroundColor: `${isAddressValid?"#13da97":"#e8e8e8"}`}}><AntDesign name="check" size={12} color="white" style={{ display: `${isAddressValid?'flex':'none'}` }}/></View></View>
            </View>

            <View style={styles.genderRow}>
              <Text style={{...styles.inputTitle, marginRight: 'auto'}}>جنسیت</Text>

              <View style={styles.genderSwitch} >
                <TouchableWithoutFeedback onPress={selectMan}>
                  <View style={{...styles.checkbox, backgroundColor: `${gender=='man'?"#2683ae":"#ffffff"}`}} >
                    <Text style={{...styles.genderText, color: `${gender=='man'?"#ffffff":"#2683ae"}`}}>آقا</Text>
                  </View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={selectWoman}>
                <View style={{...styles.checkbox, backgroundColor: `${gender=='woman'?"#2683ae":"#ffffff"}`}} >
                    <Text style={{...styles.genderText, color: `${gender=='woman'?"#ffffff":"#2683ae"}`}}>خانم</Text>
                  </View>
                </TouchableWithoutFeedback>
              
              </View>
            </View>

          </View>

          <View style={styles.footer}>
            
            <TouchableOpacity
              style={styles.nextStep}
              onPress={validation}
            >
              <Text style={{fontFamily: 'IRANSans', fontSize: 20, color: '#ffffff'}}>مرحله بعد</Text>
            </TouchableOpacity>
          </View>


        </ScrollView >
        </View>
        
      );

    } else {
      return <AppLoading />;
    }
}





const mapStateToProps = (state) => ({
  data: state.data,
})

const mapDispatchToProps = (dispatch) => ({
  dispatch: dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)






const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    height: '100%'
    
  },

  titleContainer: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: '#f2f2f2',
  },

  title: {
    fontFamily: 'IRANSans',
    color: '#73717c',
    fontSize: 18,
  },

  werapper: {
    paddingHorizontal: 16,
  },

  inputContainer: {
    marginTop: 24,
    height: 42, 
    // borderColor: '#e7e7e7', 
    borderWidth: 1,
    borderRadius: 4,
    paddingLeft: 16,
    paddingRight: 0,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    
  },

  inputTitle: {
    width: '25%',
    color: '#2783b6',
    fontFamily: 'IRANSans',
    fontSize: 16,
  },

  input: {
    alignSelf: 'stretch',
    // borderColor: '#e7e7e7', 
    // borderWidth: 1,
    // borderRadius: 4,
    width: '65%',
    textAlign: 'right',
  },

  point: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 18,
    height: 18,
    borderRadius: 10,
    borderWidth: 0,

  },

  divider: {
    marginTop: 28,
    height: 16,
    backgroundColor: '#f2f2f2',
  },

  genderRow: {
    flexDirection: 'row-reverse',
    marginTop: 24,
    alignItems: 'center',
    justifyContent: 'space-between',

  },

  genderSwitch: {
    backgroundColor: '#2683ae',
    width: '50%',
    height: 36,
    flexDirection: 'row-reverse',
    borderRadius: 8,
    borderWidth: 3,
    borderColor: '#2683ae',
    overflow: 'hidden',

  },

  checkbox: {
    backgroundColor: '#ffffff', 
    width: '50%', 
    alignItems: 'center', 
    justifyContent: 'center',
  },

  genderText: {
    fontFamily: 'IRANSans',
    fontSize: 16,

  },

  footer: {
    marginTop: 24,
    paddingHorizontal: 16,
    backgroundColor: '#f2f2f2',
    flex: 1,
    minHeight: 86,
    justifyContent: 'center',
    
  },

  nextStep: {
    backgroundColor: '#13da97',
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8

  }

  
});
