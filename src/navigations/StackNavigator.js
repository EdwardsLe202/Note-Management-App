import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from '../screens/Home/HomeScreen';
import EditNote from '../screens/Home/EditNote';
import NewNote from '../screens/Home/NewNote';

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="EditNote" component={EditNote} />
      <Stack.Screen name="NewNote" component={NewNote} />
    </Stack.Navigator>
  );
}

export default StackNavigator;
