import React from 'react';
import { FlatList, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { IAddresses } from '../../interfaces/geocodeResponse';
import {
  destinationAddressObject,
  destinationPoint,
  pinPoint,
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
      <View style={styles.itemContainer}>
        <View>
          <PlaceName placeName={props.item.placeName} />
          <Text>{props.item.roadAddress}</Text>
        </View>
        <Text style={styles.textChip}>{props.isFindSource ? '출발' : '도착'}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const PlaceName = (props: { placeName?: string }) =>
  props.placeName ? <Text>{props.placeName}</Text> : <></>;

const styles = StyleSheet.create({
  itemContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  textChip: {
    padding: 4,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 2,
  },
});

export default AddressListComponent;
