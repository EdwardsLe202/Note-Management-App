//App.js
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import DrawerNavigator from './src/navigations/DrawNavigator';
import "react-native-gesture-handler";
import StackNavigator from './src/navigations/StackNavigator';
import { NavigationContainer } from '@react-navigation/native';
export default function App() {
  return (
  <NavigationContainer>
      <DrawerNavigator/>
  </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
