import React, { useRef, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { IFindAddressScreenProps } from '../interfaces/defaultScreenProps';
import { AddressState } from '../redux/maps/addressFindStore';
import { IAddresses } from '../interfaces/geocodeResponse';
import AddressListComponent from '../components/findAddress/AddressList';
import { findSource } from '../redux/maps/addressFindSlice';
import _ from 'lodash';
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
    <View style={{ backgroundColor: 'white', height: '100%' }}>
      <View style={{ ...styles.inputContainer, marginTop: 24 }}>
        <TextInput
          returnKeyType={'search'}
          style={styles.textInput}
          placeholder={'[출발지] 검색해주세요'}
          defaultValue={sourceAddressObject.placeName || ''}
          onChangeText={(text) => {
            console.log('textChange');
            searchKeywordDebounce(text, centerLocation, setAddressList);
          }}
          onFocus={(e) => {
            console.log(sourceAddressObject.placeName);
            dispatch(findSource(true));
          }}
          onBlur={() => {
            setAddressList([]);
          }}
        />
        <TextInput
          returnKeyType={'search'}
          style={styles.textInput}
          placeholder={'[목적지] 검색해주세요'}
          defaultValue={destinationAddressObject.placeName || ''}
          onChangeText={(text) => {
            searchKeywordDebounce(text, centerLocation, setAddressList);
          }}
          onFocus={(e) => {
            dispatch(findSource(false));
          }}
          onBlur={() => {
            setAddressList([]);
          }}
        />
      </View>
      <View style={styles.shortCutContainer}>
        <View style={styles.shortCutWithTextContainer}>
          <TouchableWithoutFeedback>
            <View style={styles.shortCutWithText}>
              <Icon name="home" size={16} />
              <Text> 집 </Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback>
            <View style={styles.shortCutWithText}>
              <Icon name="domain" size={16} />
              <Text> 회사 </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.shortCutWithoutTextContainer}>
          <View style={styles.rightBar}>
            <TouchableWithoutFeedback
              onPress={() => {
                navigation.setOptions({ headerShown: false });
                navigation.push('FindAddressOnMap');
              }}>
              <Icon name="map" size={16} />
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.rightBar}>
            <TouchableWithoutFeedback>
              <Icon name="my-location" size={16} />
            </TouchableWithoutFeedback>
          </View>
          <TouchableWithoutFeedback>
            <Text style={styles.shortCutOnlyText}>편집</Text>
          </TouchableWithoutFeedback>
        </View>
      </View>
      <AddressListComponent addressList={addressList} />
    </View>
  );
};
const styles = StyleSheet.create({
  inputContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  textInput: {
    height: 50,
    fontSize: 16,
    backgroundColor: 'white',
    marginTop: 8,
    paddingLeft: 16,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    width: '90%',
  },
  shortCutContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingLeft: 16,
    paddingRight: 16,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    borderStyle: 'solid',
    paddingBottom: 16,
    paddingTop: 36,
  },
  shortCutWithTextContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
  },
  shortCutWithText: { display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', marginRight: 16 },
  shortCutWithoutTextContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
  },
  shortCutOnlyText: {
    fontSize: 12,
    height: 16,
    borderRadius: 2,
    borderStyle: 'solid',
    borderColor: '#ccc',
    borderWidth: 1,
    marginLeft: 8,
  },
  rightBar: {
    borderStyle: 'solid',
    borderRightWidth: 1,
    paddingLeft: 8,
    paddingRight: 8,
    borderColor: '#ccc',
  },
});

export default FindAddressScreen;
