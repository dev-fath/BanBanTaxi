import * as React from 'react';
import { View, SafeAreaView } from 'react-native';
import BanBanMap from '../components/NMapComponent';
import { IDefaultScreenProps } from '../interfaces/defaultScreenProps';
import MenuButton from '../components/MenuButton';

function HomeScreen({ navigation }: IDefaultScreenProps) {
  return (
    <SafeAreaView style={{ width: '100%', height: '100%' }}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <BanBanMap />
        <MenuButton navigation={navigation} />
      </View>
    </SafeAreaView>
  );
}

export default HomeScreen;
