import React from 'react';

import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';

import { AddressState } from '../../redux/maps/addressFindStore';
import { findSource } from '../../redux/maps/addressFindSlice';
import { DefaultScreenNavigationProp } from '../../@types/screenTypes';

const JourneySettingComponent = () => {
  const navigation: DefaultScreenNavigationProp = useNavigation();
  const dispatch = useDispatch();
  const sourceAddress: string =
    useSelector((state: AddressState) => state.sourceAddressObject.placeName) || '';
  const destinationAddress: string =
    useSelector((state: AddressState) => state.destinationAddressObject.placeName) || '';

  return (
    <Container>
      <Wrapper>
        <SourceArea
          onPress={() => {
            dispatch(findSource(true));
            navigation.navigate('FindAddressNavigator');
          }}>
          <AreaText>{sourceAddress}</AreaText>
          <AreaIcon name="locate-outline" size={18} />
        </SourceArea>
        <DestinationArea
          onPress={() => {
            dispatch(findSource(false));
            navigation.navigate('FindAddressNavigator');
          }}>
          <AreaText highlightColor={true}>{destinationAddress || '어디로 모실까요?'}</AreaText>
          <AreaIcon highlightColor={true} name={'arrow-forward-outline'} size={18} />
        </DestinationArea>
      </Wrapper>
    </Container>
  );
};

const Container = styled.View`
  position: absolute;
  bottom: 0;
  width: 100%;
  min-height: 150px;
  height: 30%;
  padding: 0 24px;
  background-color: white;
  border-radius: 50px;
`;

const Wrapper = styled.View`
  display: flex;
  width: 100%;
  height: 100%;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
`;

const SourceArea = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 16px;
  height: 56px;
`;

const AreaText = styled.Text`
  font-size: 18px;
  color: ${(props: { highlightColor?: boolean }) => (props.highlightColor ? '#0F0' : '#000')};
`;

const DestinationArea = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 16px;
  height: 56px;
  background-color: black;
`;

const AreaIcon = styled(Icon)`
  color: ${(props: { highlightColor?: boolean }) => (props.highlightColor ? '#0F0' : '#000')};
`;

export default JourneySettingComponent;
