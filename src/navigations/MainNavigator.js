//MainNavigator.js
import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import DrawerNavigator from './DrawerNavigator';
import EditNoteNavigator from './EditNoteNavigator';
import NewNoteNavigator from './NewNoteNavigator';
import ManageLabels from '../screens/Labels/ManageLabels';
import ManageFolderScreen from '../screens/Folders/ManageFolderScreen';



const Stack = createStackNavigator();

const MainNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={DrawerNavigator} />
      <Stack.Screen name="EditNoteNavigator" component={EditNoteNavigator} />
      <Stack.Screen name="NewNoteNavigator" component={NewNoteNavigator} />
      <Stack.Screen name="ManageLabels" component={ManageLabels}/>
      <Stack.Screen name="ManageFolder" component={ManageFolderScreen}/>

    </Stack.Navigator>
  );
}

export default MainNavigator;
