import { Coord } from 'react-native-nmap/index';
import { loadReverseGeocode } from '../../services/maps/naverMapApiService';
import { ILand, IReverseGeocodeResponse } from '../../interfaces/geocodeResponse';

export const getTargetName = (land: ILand) => {
  if (land?.addition0?.value !== '') {
    return `${land?.addition0?.value}`;
  } else {
    return `${land.name} ${land.number1} ${land.number2}`;
  }
};
export const getAddressFromPoint = (coord: Coord) => {
  return loadReverseGeocode({
    coords: coord,
    orders: ['roadaddr'],
    output: 'json',
  })
    .then<IReverseGeocodeResponse>((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.status.code === 3) {
        console.log('목적지 정보 없음');
        return '';
      }
      // return getTargetName(data?.results[0]?.land);
    });
};
