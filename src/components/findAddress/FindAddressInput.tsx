import React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';

import { IAddresses } from '../../interfaces/geocodeResponse';
import { AddressState } from '../../redux/maps/addressFindStore';
import { findSource } from '../../redux/maps/addressFindSlice';
import loadAddresses from '../../services/maps/loadAddressService';

const FindTargetTextInputComponent = (props: {
  placeholder: string;
  isFindSource: boolean;
  setAddressList: React.Dispatch<React.SetStateAction<IAddresses[]>>;
}) => {
  const dispatch = useDispatch();
  const centerLocation = useSelector((state: AddressState) => state.pinPoint);
  const sourceAddressObject = useSelector((state: AddressState) => state.sourceAddressObject);
  const destinationAddressObject = useSelector(
    (state: AddressState) => state.destinationAddressObject,
  );
  const searchKeywordDebounce = _.debounce(loadAddresses, 250);
  //TODO : ref 설정해서 엔터키 입력하면 목적지 설정으로 이동
  return (
    <TextInput
      returnKeyType={'search'}
      style={styles.textInput}
      placeholder={props.placeholder}
      defaultValue={
        props.isFindSource ? sourceAddressObject.placeName : destinationAddressObject.placeName
      }
      autoFocus={props.isFindSource}
      onChangeText={(text) => {
        searchKeywordDebounce(text, centerLocation, props.setAddressList);
      }}
      onFocus={(e) => {
        searchKeywordDebounce(e.nativeEvent.text, centerLocation, props.setAddressList);
        dispatch(findSource(props.isFindSource));
        props.setAddressList([]);
      }}
    />
  );
};
React.memo(FindTargetTextInputComponent);

const styles = StyleSheet.create({
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
});

export default FindTargetTextInputComponent;
