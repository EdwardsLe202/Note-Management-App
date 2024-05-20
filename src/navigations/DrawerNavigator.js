import React from 'react';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
import FolderScreen from '../screens/Folders/FolderScreen';
import TrashScreen from '../screens/Trash/TrashScreen';
import { COlORPICKER, COLOR } from '../theme/theme';
import { Fontisto, Feather, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, View, Image, Text } from 'react-native';
import HomeNavigator from './HomeNavigator';
import LabelsNavigator from './LabelsNavigator';
import TrashNavigator from './TrashNavigator';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => {
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
      }}
      screenOptions={{
        drawerStyle: {
          backgroundColor: COLOR.primaryWhiteHex,
          width: 250,
        },
        headerStyle: {
          backgroundColor: COLOR.primaryBlue
        },
        headerTintColor: COLOR.primaryWhiteHex,
        headerTitleStyle: {
          fontWeight: 'bold'
        },
        drawerActiveTintColor: COLOR.primaryBlue,
        drawerLabelStyle: {
          color: COLOR.primaryBlue
        }
      }}
    >
      <Drawer.Screen
        name="HomeDrawer"
        options={{
          drawerLabel: "Home",
          title: "Home",
          drawerIcon: ({ }) => (
            <Feather name="home" size={20} color={COLOR.primaryBlue} />
          ),
        }}
      >
        {props => <HomeNavigator {...props} />}
      </Drawer.Screen>
      <Drawer.Screen
        name="Folders"
        options={{
          drawerLabel: "Folders",
          title: "Folders",
          drawerIcon: ({ }) => (
            <AntDesign name="folder1" size={20} color={COLOR.primaryBlue} />
          ),
        }}
        component={FolderScreen}
      />
      <Drawer.Screen
        name="Labels"
        options={{
          drawerLabel: "Labels",
          title: "Labels",
          drawerIcon: ({ }) => (
            <MaterialCommunityIcons name="label-multiple-outline" size={20} color={COLOR.primaryBlue} />
          ),
        }}
        component={LabelsNavigator}
      />
      <Drawer.Screen
        name="Trash"
        options={{
          drawerLabel: "Trash",
          title: "Trash",
          drawerIcon: ({ }) => (
            <Feather name="trash-2" size={20} color={COLOR.primaryBlue} />
          ),
        }}
        component={TrashNavigator}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
