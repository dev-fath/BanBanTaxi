import React from 'react';
import { FlatList, Text, TouchableWithoutFeedback, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';

import { IAddresses } from '../../interfaces/geocodeResponse';
import {
  destinationAddressObject,
  destinationPoint,
  sourceAddressObject,
  sourcePoint,
} from '../../redux/maps/addressFindSlice';
import { FindAddressScreenNavigationProp } from '../../@types/screenTypes';
import { AddressState } from '../../redux/maps/addressFindStore';

const AddressListComponent = (props: { addressList: IAddresses[] }) => {
  const isFindSource = useSelector((state: AddressState) => state.isFindSource);
  return (
    <View>
      <FlatList
        scrollEnabled={true}
        data={props.addressList}
        renderItem={({ item }) => <AddressItem item={item} isFindSource={isFindSource} />}
      />
    </View>
  );
};

const AddressItem = (props: { item: IAddresses; isFindSource: boolean }) => {
  const dispatch = useDispatch();
  const navigation: FindAddressScreenNavigationProp = useNavigation();
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        if (props.isFindSource) {
          dispatch(
            sourcePoint({ latitude: Number(props.item.y), longitude: Number(props.item.x) }),
          );
          dispatch(sourceAddressObject(props.item));
        } else {
          dispatch(
            destinationPoint({ latitude: Number(props.item.y), longitude: Number(props.item.x) }),
          );
          dispatch(destinationAddressObject(props.item));
        }
        navigation.navigate('FindAddressOnMap');
      }}>
      <ItemContainer>
        <View>
          <PlaceName placeName={props.item.placeName} />
          <Text>{props.item.roadAddress}</Text>
        </View>
        <TextChip>{props.isFindSource ? '출발' : '도착'}</TextChip>
      </ItemContainer>
    </TouchableWithoutFeedback>
  );
};

const PlaceName = (props: { placeName?: string }) =>
  props.placeName ? <Text>{props.placeName}</Text> : <></>;

const ItemContainer = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom-width: 1px;
  border-bottom-color: #ccc;
`;

const TextChip = styled.Text`
  font-size: 12px;
  padding: 4px;
  border-style: solid;
  border-width: 1px;
  border-color: #ccc;
  border-radius: 4px;
`;

export default AddressListComponent;
