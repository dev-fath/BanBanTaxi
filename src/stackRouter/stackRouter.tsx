import React from 'react';
import { RootStackParamList } from '../@types/screenTypes';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import MenuScreen from '../screens/MenuScreen';
import { FindAddressNavigator } from './FindAddressRouter';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: true }}>
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen
          name="Menu"
          component={MenuScreen}
          options={{ headerShown: true, animation: 'simple_push' }}
        />
        <Stack.Screen
          name="FindAddressNavigator"
          component={FindAddressNavigator}
          options={{ title: '주소찾기' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
