import * as React from 'react';
import { View, SafeAreaView } from 'react-native';
import BanBanMap from '../components/NMapComponent';
import { IDefaultScreenProps } from '../interfaces/defaultScreenProps';
import MenuButton from '../components/MenuButton';
import { Provider } from 'react-redux';
import { addressFindStore } from '../redux/addressFind/addressFindStore';
import JourneySettingContainer from '../components/JourneySettingContainer/JourneySettingContainer';

function HomeScreen({ navigation }: IDefaultScreenProps) {
  //TODO : 내 현재 위치 가져오기
  return (
    <SafeAreaView style={{ width: '100%', height: '100%' }}>
      <Provider store={addressFindStore}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <BanBanMap />
          <MenuButton navigation={navigation} />
          <JourneySettingContainer />
        </View>
      </Provider>
    </SafeAreaView>
  );
}

export default HomeScreen;
