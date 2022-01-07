import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { DefaultScreenNavigationProp, DefaultScreenRouteProp } from '../@types/screenTypes';

interface IDefaultScreenProps {
  route?: DefaultScreenRouteProp;
  navigation: DefaultScreenNavigationProp;
}

function HomeScreen({ navigation }: IDefaultScreenProps) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Text>Home Screen</Text>
      <Text>Home Screen</Text>
      <Text>Home Screen</Text>
      <Text>Home Screen</Text>
      <Text>Home Screen</Text>
      <Text>Home Screen</Text>
      <Text>Home Screen</Text>
      <Text>Home Screen</Text>
      <Text>Home Screen</Text>
      <Text>Home Screen</Text>
      <Text>Home Screen</Text>
      <Text>Home Screen</Text>
      <Text>Home Screen</Text>
      <Text>Home Screen</Text>
      <Button title="Go to Details" onPress={() => navigation.navigate('Menu')} />
    </View>
  );
}

export default HomeScreen;
