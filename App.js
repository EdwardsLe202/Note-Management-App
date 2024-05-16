import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import DrawerNavigator from './src/navigations/DrawNavigator';
import "react-native-gesture-handler";
import StackNavigator from './src/navigations/StackNavigator';

export default function App() {
  return (
      <DrawerNavigator />
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
