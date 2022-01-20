import React, { useState } from 'react';
import { Text, TouchableWithoutFeedback } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import _ from 'lodash';
import styled from 'styled-components/native';

import { IFindAddressScreenProps } from '../interfaces/defaultScreenProps';
import { AddressState } from '../redux/maps/addressFindStore';
import { IAddresses } from '../interfaces/geocodeResponse';
import AddressListComponent from '../components/findAddress/AddressList';
import { findSource } from '../redux/maps/addressFindSlice';
import loadAddresses from '../services/maps/loadAddressService';

const FindAddressScreen = ({ navigation }: IFindAddressScreenProps) => {
  const dispatch = useDispatch();
  const sourceAddressObject = useSelector((state: AddressState) => state.sourceAddressObject);
  const destinationAddressObject = useSelector(
    (state: AddressState) => state.destinationAddressObject,
  );
  const searchKeywordDebounce = _.debounce(loadAddresses, 250);
  const centerLocation = useSelector((state: AddressState) => state.centerPoint);
  const [addressList, setAddressList] = useState<IAddresses[]>([]);
  return (
    <Screen>
      <InputContainer marginTop={24}>
        <Input
          returnKeyType={'search'}
          placeholder={'[출발지] 검색해주세요'}
          defaultValue={sourceAddressObject.placeName || ''}
          onChangeText={(text) => {
            searchKeywordDebounce(text, centerLocation, setAddressList);
          }}
          onFocus={() => {
            dispatch(findSource(true));
          }}
          onBlur={() => {
            setAddressList([]);
          }}
        />
        <Input
          returnKeyType={'search'}
          placeholder={'[목적지] 검색해주세요'}
          defaultValue={destinationAddressObject.placeName || ''}
          onChangeText={(text) => {
            searchKeywordDebounce(text, centerLocation, setAddressList);
          }}
          onFocus={() => {
            dispatch(findSource(false));
          }}
          onBlur={() => {
            setAddressList([]);
          }}
        />
      </InputContainer>
      <ShortCutContainer style={{ borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
        <ShortCutWrapper>
          <TouchableWithoutFeedback>
            <ShortCutWithTextWrapper>
              <Icon name="home" size={16} />
              <Text> 집 </Text>
            </ShortCutWithTextWrapper>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback>
            <ShortCutWithTextWrapper>
              <Icon name="domain" size={16} />
              <Text> 회사 </Text>
            </ShortCutWithTextWrapper>
          </TouchableWithoutFeedback>
        </ShortCutWrapper>
        <ShortCutWrapper>
          <TouchableWithoutFeedback
            onPress={() => {
              navigation.setOptions({ headerShown: false });
              navigation.push('FindAddressOnMap');
            }}>
            <Icon name="map" size={16} />
          </TouchableWithoutFeedback>
          <VerticalBar style={{ borderRightWidth: 1, borderRightColor: '#ccc' }} />
          <TouchableWithoutFeedback>
            <Icon name="my-location" size={16} />
          </TouchableWithoutFeedback>
          <VerticalBar style={{ borderRightWidth: 1, borderRightColor: '#ccc' }} />
          <TouchableWithoutFeedback>
            <TextShortCut>편집</TextShortCut>
          </TouchableWithoutFeedback>
        </ShortCutWrapper>
      </ShortCutContainer>
      <AddressListComponent addressList={addressList} />
    </Screen>
  );
};

const Screen = styled.View`
  background-color: white;
  height: 100%;
`;
const InputContainer = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: ${(props: { marginTop?: number }) => props.marginTop || 0}px;
`;

const Input = styled.TextInput`
  height: 50px;
  font-size: 16px;
  background-color: white;
  margin-top: 8px;
  padding-left: 16px;
  border-radius: 50px;
  border: solid 1px #ccc;
  width: 90%;
`;

const ShortCutContainer = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
  padding: 36px 16px 16px;
`;
const ShortCutWrapper = styled.View`
  display: flex;
  flex-flow: row nowrap;
`;
const ShortCutWithTextWrapper = styled.View`
  display: flex;
  flex-flow: row nowrap;
  margin-right: 16px;
`;
const TextShortCut = styled.Text`
  font-size: 12px;
  height: 16px;
  border-radius: 2px;
  border: solid 1px #ccc;
`;
const VerticalBar = styled.View`
  margin: 0 8px;
`;

export default FindAddressScreen;
