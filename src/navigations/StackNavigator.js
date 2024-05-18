import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from '../screens/Home/HomeScreen';
import EditNote from '../screens/Home/EditNote';
import NewNote from '../screens/Home/NewNote';
import ManageLabels from '../screens/Labels/ManageLabels';

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='Home'>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="EditNote" component={EditNote} />
      <Stack.Screen name="NewNote" component={NewNote} />
      <Stack.Screen name="ManageLabels" component={ManageLabels} />
    </Stack.Navigator>
  );
}

export default StackNavigator;
