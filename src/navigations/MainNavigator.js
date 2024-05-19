//MainNavigator.js
import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import DrawerNavigator from './DrawerNavigator';
import EditNoteNavigator from './EditNoteNavigator';
import NewNoteNavigator from './NewNoteNavigator';

const Stack = createStackNavigator();

const MainNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={DrawerNavigator} />
      <Stack.Screen name="EditNoteNavigator" component={EditNoteNavigator} />
      <Stack.Screen name="NewNoteNavigator" component={NewNoteNavigator} />
    </Stack.Navigator>
  );
}

export default MainNavigator;
