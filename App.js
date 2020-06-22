import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';


import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reduceer from './redux/reducer'


import useCachedResources from './hooks/useCachedResources';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import LinkingConfiguration from './navigation/LinkingConfiguration';

import HomeScreen from './screens/HomeScreen';
import Map from './screens/Map';
import List from './screens/List';
import Modal from './screens/Modal';


const store = createStore(reduceer)


const Stack = createStackNavigator();

export default function App(props) {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />}
          {/* <NavigationContainer linking={LinkingConfiguration}>
            <Stack.Navigator>
              <Stack.Screen name="Root" component={BottomTabNavigator} options={{title: "Home"}} />
            </Stack.Navigator>
          </NavigationContainer> */}
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
              <Stack.Screen name="Home" options={{ title: "ثبت نام", headerTitleStyle: {textAlign: 'right', fontWeight: 'bold', } }} component={HomeScreen} />
              <Stack.Screen name="Map" options={{ title: "موقعیت روی نقشه", headerTitleStyle: {textAlign: 'right', fontWeight: 'bold', } }} component={Map} />
              <Stack.Screen name="List" options={{ title: "لیست کاربران", headerTitleStyle: {textAlign: 'right', fontWeight: 'bold', } }} component={List} />
              <Stack.Screen name="Modal" options={{ title: "Modal", headerTitleStyle: {textAlign: 'right', fontWeight: 'bold', } }} component={Modal} />
              {/* <Stack.Screen name="Details" component={DetailsScreen} /> */}
            </Stack.Navigator>
          </NavigationContainer>
        </View>
      </Provider>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
