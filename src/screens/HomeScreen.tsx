import * as React from 'react';
import { View, SafeAreaView } from 'react-native';
import { Provider } from 'react-redux';

import BanBanMap from '../components/maps/NMapComponent';
import { IDefaultScreenProps } from '../interfaces/defaultScreenProps';
import MenuButton from '../components/common/MenuButton';
import { addressFindStore } from '../redux/maps/addressFindStore';
import JourneySettingComponent from '../components/JourneySettingContainer/JourneySettingComponent';

function HomeScreen({ navigation }: IDefaultScreenProps) {
  //TODO : 내 현재 위치 가져오기
  return (
    <SafeAreaView style={{ width: '100%', height: '100%' }}>
      <Provider store={addressFindStore}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <BanBanMap />
          <MenuButton navigation={navigation} />
          <JourneySettingComponent navigation={navigation} />
        </View>
      </Provider>
    </SafeAreaView>
  );
}

export default HomeScreen;
