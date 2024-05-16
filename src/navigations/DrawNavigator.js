import React from 'react';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
import HomeScreen from '../../src/screens/Home/HomeScreen';
import FolderScreen from '../../src/screens/Folders/FolderScreen';
import LabelScreen from '../../src/screens/Labels/LabelScreen';
import TrashScreen from '../../src/screens/Trash/TrashScreen';
import { NavigationContainer } from '@react-navigation/native';
import { COlORPICKER, COLORS } from '../theme/theme';
import { Fontisto,Feather, AntDesign, MaterialCommunityIcons   } from '@expo/vector-icons';
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, View, Image, Text } from 'react-native';


const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator

drawerContent={
    (props) => {
      return (
        <SafeAreaView>
          <View
            style={{
              height: 200,
              width: '100%',
              justifyContent: "center",
              alignItems: "center",
              borderBottomColor: "#f4f4f4",
              borderBottomWidth: 1
            }}
          >
            <Image
              source={require('../../assets/app.png')}
              style={{
                height: 130,
                width: 130,
                borderRadius: 65
              }}
            />
            <Text
              style={{
                fontSize: 22,
                marginVertical: 6,
                fontWeight: "bold",
                color: "#111"
              }}
            >Note Management</Text>
          </View>
          <DrawerItemList {...props} />
        </SafeAreaView>
      )
    }
  }
         screenOptions={{
            drawStyle: {
                backgroundColor: COLORS.primaryWhiteHex,
                width: 250,            
            },
            headerStyle: {
                backgroundColor: COLORS.primaryBlue
            },
            headerTintColor: COLORS.primaryWhiteHex,
            headerTitleStyle: {
                fontWeight: 'bold'
            },
            drawerActiveTintColor:COLORS.primaryBlue,
            drawerLabelStyle: {
                color: COLORS.primaryBlue
            }
         }}
      
      
      >
        <Drawer.Screen
            name="Home"
            options={{
                drawerLabel: "Home",
                title: "Home",
                drawerIcon: ({}) => (
                <Feather name="home" size={20} color= {COLORS.primaryBlue} />
                ),
            }}
            component={HomeScreen}
        />
        <Drawer.Screen
            name="Folders"
            options={{
                drawerLabel: "Folders",
                title: "Folders",
                drawerIcon: ({}) => (
                <AntDesign name="folder1" size={20} color={COLORS.primaryBlue} />
                ),
            }}
            component={FolderScreen}
        />
        <Drawer.Screen
            name="Labels"
            options={{
                drawerLabel: "Labels",
                title: "Labels",
                drawerIcon: ({}) => (
                <MaterialCommunityIcons name="label-multiple-outline" size={20} color={COLORS.primaryBlue} />
                ),
            }}
            component={LabelScreen}
        />
        <Drawer.Screen
            name="Trash"
            options={{
                drawerLabel: "Trash",
                title: "Trash",
                drawerIcon: ({}) => (
                <Feather name="trash-2" size={20} color={COLORS.primaryBlue} />
                ),
            }}
            component={TrashScreen}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default DrawerNavigator;
