import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { IFindAddressScreenProps } from '../interfaces/defaultScreenProps';
import _ from 'lodash';
import { loadKakaoAddress } from '../services/maps/naverMapApiService';
import { useSelector } from 'react-redux';
import { AddressState } from '../redux/maps/addressFindStore';
import {
  IAddresses,
  IKakaoAddressDocuments,
  IKakaoAddressResponse,
} from '../interfaces/geocodeResponse';

const FindAddressScreen = ({ navigation }: IFindAddressScreenProps) => {
  const [addressList, setAddressList] = useState<IAddresses[]>([]);
  const centerLocation = useSelector((state: AddressState) => state.pinPoint);
  const centerLocationParam = `${centerLocation.longitude},${centerLocation.latitude}`;
  const loadAddresses = (text: string) => {
    const addressFormatter = (addresses: IKakaoAddressDocuments[]) => {
      return addresses.map((address): IAddresses => {
        return {
          roadAddress: address.address_name,
          x: address.x,
          y: address.y,
        };
      });
    };

    const getKakaoAddressList = loadKakaoAddress('keyword', {
      query: text,
      count: 10,
      x: centerLocation.longitude,
      y: centerLocation.latitude,
      sort: 'distance',
    }).then((response) =>
      response.json().then<IKakaoAddressResponse>((data: IKakaoAddressResponse) => data),
    );
    void getKakaoAddressList
      .then((response) => {
        console.log(response);
        return addressFormatter(response.documents);
      })
      .then((result) => {
        result ? setAddressList(result) : [];
      });
  };
  const searchKeywordDebounce = _.debounce(loadAddresses, 250);

  return (
    <View style={{ backgroundColor: 'white', height: '100%' }}>
      <View style={{ ...styles.inputContainer, marginTop: 24 }}>
        <TextInput
          style={styles.textInput}
          placeholder={'[출발지] 검색해주세요'}
          onChangeText={(text) => {
            searchKeywordDebounce(text);
          }}
        />
        <TextInput
          style={styles.textInput}
          placeholder={'[목적지] 검색해주세요'}
          onTextInput={(e) => {
            //TODO : 주소 찾아와서 setState
            console.log(e);
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
        <View style={styles.shortCutWithTextContainer}>
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

//TODO : 검색결과 항목 클릭하면 좌표로 주소 검색
const AddressListComponent = (props: { addressList: IAddresses[] }) => {
  return (
    <FlatList data={props.addressList} renderItem={({ item }) => <Text>{item.roadAddress}</Text>} />
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
  shortCutWithoutContainer: {
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
