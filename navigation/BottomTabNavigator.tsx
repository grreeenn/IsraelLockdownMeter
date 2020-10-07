import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import TabOneScreen from '../screens/measure/TabOneScreen';
import TabTwoScreen from '../screens/settings/TabTwoScreen';
import {BottomTabParamList, TabOneParamList, TabThreeParamList, TabTwoParamList} from '../types';
import TabThreeScreen from "../screens/about/TabThreeScreen";
import {useTranslation} from "react-i18next";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();


// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator<TabOneParamList>();

function TabOneNavigator() {
  const [t] = useTranslation(['navigation'])
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="TabOneScreen"
        component={TabOneScreen}
        options={{ headerTitle: t('Measure') }}
      />
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator<TabTwoParamList>();

function TabTwoNavigator() {
  const [t] = useTranslation(['navigation'])
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="TabTwoScreen"
        component={TabTwoScreen}
        options={{ headerTitle: t('Settings') }}
      />
    </TabTwoStack.Navigator>
  );
}

const TabThreeStack = createStackNavigator<TabThreeParamList>();

function TabThreeNavigator() {
  const [t] = useTranslation(['navigation'])
  return (
    <TabThreeStack.Navigator>
      <TabThreeStack.Screen
        name="TabThreeScreen"
        component={TabThreeScreen}
        options={{ headerTitle: t('About') }}
      />
    </TabThreeStack.Navigator>
  );
}
export default function BottomTabNavigator() {
  const [t] = useTranslation(['navigation'])
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Measure"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>
      <BottomTab.Screen
        name="About"
        component={TabThreeNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="md-paw" color={color} />,
          tabBarLabel: t('About')
        }}
      />
      <BottomTab.Screen
        name="Measure"
        component={TabOneNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-resize" color={color} />,
          tabBarLabel: t('Measure')
        }}
      />
      <BottomTab.Screen
        name="Settings"
        component={TabTwoNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-settings" color={color} />,
          tabBarLabel: t('Settings')
        }}
      />
    </BottomTab.Navigator>
  );
}

