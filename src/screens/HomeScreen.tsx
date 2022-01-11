import * as React from 'react';
import { View, SafeAreaView } from 'react-native';
import BanBanMap from '../components/NMapComponent';
import { IDefaultScreenProps } from '../interfaces/defaultScreenProps';
import MenuButton from '../components/MenuButton';
import JourneySettingComponent from '../components/JourneySettingComponent';
import { useState } from 'react';
import { Coord } from 'react-native-nmap/index';
import { Provider } from 'react-redux';
import { addressFindStore } from '../redux/addressFind/addressFindStore';

function HomeScreen({ navigation }: IDefaultScreenProps) {
  //TODO : 내 현재 위치 가져오기
  const [directions, setDirections] = useState<Coord[]>([
    { latitude: 0, longitude: 0 },
    { latitude: 0, longitude: 0 },
  ]);
  return (
    <SafeAreaView style={{ width: '100%', height: '100%' }}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <BanBanMap directions={directions} />
        <MenuButton navigation={navigation} />
        <Provider store={addressFindStore}>
          <JourneySettingComponent setDirections={setDirections} />
        </Provider>
      </View>
    </SafeAreaView>
  );
}

export default HomeScreen;
