//EditNoteNavigator.js
import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from '../screens/Home/HomeScreen';
import EditNote from '../screens/Home/EditNote';
import NewNote from '../screens/Home/NewNote';
import ManageLabels from '../screens/Labels/ManageLabels';


const Stack = createStackNavigator();

const EditNoteNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="EditNote" component={EditNote} />
    </Stack.Navigator>
  );
}

export default EditNoteNavigator;
