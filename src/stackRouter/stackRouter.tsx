import React from 'react';
import { RootStackParamList } from '../@types/screenTypes';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import MenuScreen from '../screens/MenuScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="Menu"
          component={MenuScreen}
          options={{ headerShown: true, animation: 'simple_push' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
