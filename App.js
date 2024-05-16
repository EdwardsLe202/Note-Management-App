import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import "react-native-gesture-handler";
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './src/screens/Home/HomeScreen';
import FolderScreen from './src/screens/Folders/FolderScreen';
import LabelScreen from './src/screens/Labels/LabelScreen';
import TrashScreen from './src/screens/Trash/TrashScreen';


const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Folders" component={FolderScreen} />
        <Drawer.Screen name="Labels" component={LabelScreen} />
        <Drawer.Screen name="Trash" component={TrashScreen} />
      </Drawer.Navigator>
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
