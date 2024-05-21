//App.js
import React from 'react';
import { StyleSheet, View, LogBox } from 'react-native';
import "react-native-gesture-handler";
import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from './src/navigations/MainNavigator';
import { LabelsProvider } from './src/components/LabelsContext';
import {NotesProvider} from './src/components/NotesContext';


LogBox.ignoreAllLogs();

export default function App() {
  return (
    <NotesProvider>
      <LabelsProvider>
        <NavigationContainer>
          <MainNavigator />
        </NavigationContainer>
      </LabelsProvider>
    </NotesProvider>
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


