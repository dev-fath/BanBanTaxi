//TODO : 검색결과 항목 클릭하면 좌표로 주소 검색
import { IAddresses } from '../../interfaces/geocodeResponse';
import { FlatList, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import React from 'react';

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
  return (
    <TouchableWithoutFeedback>
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
