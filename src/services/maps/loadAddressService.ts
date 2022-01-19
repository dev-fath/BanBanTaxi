import React from 'react';
import { Coord } from 'react-native-nmap/index';
import {
  IAddresses,
  IKakaoAddressDocuments,
  IKakaoAddressResponse,
} from '../../interfaces/geocodeResponse';
import { loadKakaoAddress } from './naverMapApiService';

const loadAddresses = (
  text: string,
  centerLocation: Coord,
  setAddressList: React.Dispatch<React.SetStateAction<IAddresses[]>>,
) => {
  const addressFormatter = (addresses: IKakaoAddressDocuments[]) => {
    return addresses.map((address): IAddresses => {
      return {
        placeName: address.place_name,
        roadAddress: address.road_address_name || address.address_name,
        x: address.x,
        y: address.y,
      };
    });
  };

  const searchParams = {
    query: text,
    count: 10,
    x: centerLocation.longitude,
    y: centerLocation.latitude,
    sort: 'distance',
  };

  const getKakaoAddressListByKeyword = loadKakaoAddress('keyword', searchParams).then((response) =>
    response.json().then<IKakaoAddressResponse>((data: IKakaoAddressResponse) => data),
  );
  const getKakaoAddressListByAddress = loadKakaoAddress('address', searchParams).then((response) =>
    response.json().then<IKakaoAddressResponse>((data: IKakaoAddressResponse) => data),
  );
  void getKakaoAddressListByKeyword
    .then((response) => response.documents)
    .then((documents) => {
      if (documents.length === 0) {
        return getKakaoAddressListByAddress
          .then((response) => response.documents)
          .then((documents) => {
            return addressFormatter(documents);
          });
      } else {
        return addressFormatter(documents);
      }
    })
    .then((addressList) => {
      setAddressList(addressList);
    });
};

export default loadAddresses;
