import * as React from 'react';
import { Provider } from 'react-redux';
import styled from 'styled-components/native';

import BanBanMap from '../components/maps/NMapComponent';
import MenuButton from '../components/common/MenuButton';
import JourneySettingComponent from '../components/JourneySettingContainer/JourneySettingComponent';
import { IDefaultScreenProps } from '../interfaces/defaultScreenProps';
import { addressFindStore } from '../redux/maps/addressFindStore';

function HomeScreen({ route }: IDefaultScreenProps) {
  return (
    <Screen>
      <Provider store={addressFindStore}>
        <Container>
          <BanBanMap findPath={route?.params?.findPath} />
          <MenuButton />
          <JourneySettingComponent />
        </Container>
      </Provider>
    </Screen>
  );
}

const Screen = styled.SafeAreaView`
  width: 100%;
  height: 100%;
`;
const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export default HomeScreen;
