import * as React from 'react';
import { View, SafeAreaView } from 'react-native';
import BanBanMap from '../components/NMapComponent';
import { IDefaultScreenProps } from '../interfaces/defaultScreenProps';
import MenuButton from '../components/MenuButton';
import JourneySettingComponent from '../components/JourneySettingComponent';
import { useState } from 'react';
import { Coord } from 'react-native-nmap/index';

function HomeScreen({ navigation }: IDefaultScreenProps) {
  const [directions, setDirections] = useState<Coord[]>([]);
  return (
    <SafeAreaView style={{ width: '100%', height: '100%' }}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <BanBanMap directions={directions} />
        <MenuButton navigation={navigation} />
        <JourneySettingComponent setDirections={setDirections} />
      </View>
    </SafeAreaView>
  );
}

export default HomeScreen;
