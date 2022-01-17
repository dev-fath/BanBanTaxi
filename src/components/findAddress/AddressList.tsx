import { IAddresses } from '../../interfaces/geocodeResponse';
import { FlatList, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import React from 'react';
import { useDispatch } from 'react-redux';
import { destinationAddress, pinPoint, sourceAddress } from '../../redux/maps/addressFindSlice';
import { useNavigation } from '@react-navigation/native';
import { DefaultScreenNavigationProp } from '../../@types/screenTypes';

const AddressListComponent = (props: { addressList: IAddresses[]; isDeparture?: boolean }) => {
  const isDeparture = !!props.isDeparture;
  return (
    <View>
      {/*<Text>검색결과</Text>*/}
      <FlatList
        scrollEnabled={true}
        data={props.addressList}
        renderItem={({ item }) => <AddressItem item={item} isDeparture={isDeparture} />}
      />
    </View>
  );
};

const AddressItem = (props: { item: IAddresses; isDeparture: boolean }) => {
  const dispatch = useDispatch();
  const navigation: DefaultScreenNavigationProp = useNavigation();
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        dispatch(pinPoint({ latitude: Number(props.item.y), longitude: Number(props.item.x) }));
        if (props.isDeparture) {
          dispatch(
            sourceAddress(
              props.item.placeName || props.item.roadAddress || props.item.jibunAddress || '',
            ),
          );
        } else {
          dispatch(
            destinationAddress(
              props.item.placeName || props.item.roadAddress || props.item.jibunAddress || '',
            ),
          );
        }
        navigation.navigate('Home');
      }}>
      <View style={styles.itemContainer}>
        <View>
          <PlaceName placeName={props.item.placeName} />
          <Text>{props.item.roadAddress}</Text>
        </View>
        <Text style={styles.textChip}>{props.isDeparture ? '출발' : '도착'}</Text>
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
