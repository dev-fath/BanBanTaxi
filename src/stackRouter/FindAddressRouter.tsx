import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FindAddressStackParamList } from '../@types/screenTypes';
import FindAddressScreen from '../screens/FindAddressScreen';
import FindAddressOnMapScreen from '../screens/FindAddressOnMap';
import React from 'react';

export const FindAddressNavigator = () => {
  const Stack = createNativeStackNavigator<FindAddressStackParamList>();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={'FindAddress'} component={FindAddressScreen} />
      <Stack.Screen name={'FindAddressOnMap'} component={FindAddressOnMapScreen} />
    </Stack.Navigator>
  );
};
