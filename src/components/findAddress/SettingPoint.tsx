import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { AddressState } from '../../redux/maps/addressFindStore';
import { sourcePoint } from '../../redux/maps/addressFindSlice';
import { useNavigation } from '@react-navigation/native';
import {
  DefaultScreenNavigationProp,
  FindAddressScreenNavigationProp,
} from '../../@types/screenTypes';
import styled, { css } from 'styled-components/native';

const SettingPoint = () => {
  const dispatch = useDispatch();
  const navigation: FindAddressScreenNavigationProp = useNavigation();
  const rootNavigation: DefaultScreenNavigationProp = useNavigation();
  const isFindSource = useSelector((state: AddressState) => state.isFindSource);
  const address = isFindSource
    ? useSelector((state: AddressState) => state.sourceAddressObject)
    : useSelector((state: AddressState) => state.destinationAddressObject);
  const buttonTitle = `${isFindSource ? '출발지' : '목적지'}로 설정하기`;
  const handleClickSettingButton = () => {
    if (isFindSource) {
      dispatch(sourcePoint({ latitude: Number(address.y), longitude: Number(address.x) }));
      navigation.navigate({
        name: 'FindAddress',
        params: { setFocusDestination: true },
        merge: true,
      });
    } else {
      rootNavigation.navigate({
        name: 'Home',
        params: { findPath: true },
        merge: true,
      });
    }
  };
  return (
    <Container>
      <FieldWrapper>
        <Title>{address.placeName || address.roadAddress}</Title>
        <SubTitle>{address.placeName ? address.roadAddress : address.jibunAddress}</SubTitle>
        <SettingButton onPress={handleClickSettingButton}>
          <ButtonText>{buttonTitle}</ButtonText>
        </SettingButton>
      </FieldWrapper>
    </Container>
  );
};

const Container = styled.SafeAreaView`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 30%;
`;
const FieldWrapper = styled.View`
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 16px;
  height: 100%;
`;
const paddingBottom = css`
  padding-bottom: 12px;
`;
const Title = styled.Text`
  ${paddingBottom};
  font-size: 18px;
  font-weight: 600;
`;

const SubTitle = styled.Text`
  ${paddingBottom};
  font-size: 14px;
  color: #aaa;
  font-weight: 500;
`;

const SettingButton = styled.TouchableOpacity`
  display: flex;
  height: 56px;
  width: 100%;
  justify-content: center;
  align-items: center;
  background-color: #0f0;
`;
const ButtonText = styled.Text`
  font-size: 18px;
  font-weight: 500;
`;

export default SettingPoint;
