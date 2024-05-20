import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import TrashScreen from '../screens/Trash/TrashScreen';


const Stack = createStackNavigator();

const TrashNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="TrashScreen" component={TrashScreen} />
    </Stack.Navigator>
  );
}

export default TrashNavigator;
