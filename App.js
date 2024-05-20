//App.js
import React from 'react';
import { StyleSheet, View, LogBox } from 'react-native';
import "react-native-gesture-handler";
import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from './src/navigations/MainNavigator';
import { LabelsProvider } from './src/components/LabelsContext';


LogBox.ignoreAllLogs();

export default function App() {
  return (
  <LabelsProvider>
    <NavigationContainer>
      <MainNavigator />
    </NavigationContainer>
  </LabelsProvider>
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


