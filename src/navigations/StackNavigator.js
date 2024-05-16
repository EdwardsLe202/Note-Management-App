import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';


const Stack = createStackNavigator();

const StackNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen/>
                <Stack.Screen/>
                <Stack.Screen/>
            </Stack.Navigator>
        </NavigationContainer>

    );
}

export default StackNavigator;