import { Coord } from 'react-native-nmap/index';
import {
  IDirectionResponse,
  IGeocodeParams,
  IKakaoQueryParams,
  IReverseGeocodeParams,
  OptionCode,
} from '../../interfaces/geoPosition.interface';
import { paramsToQueryString } from '../../utils/paramsToQueryString';
import { HttpMethods } from '../apiService';
import { KakaoSearchKeywordType } from '../../interfaces/geocodeResponse';

const nmapKeyId = 'gudascnpd4';
const nmapKey = 'sMXN9pmM2HJVr0GHQAIbkvkIjKqfZ8yn8HKIvUHd';
const kakaoAddressKey = 'KakaoAK cefcf6e78a97c76f8525a8ff50a8d6d7';

export function getDirections(
  url = 'https://naveropenapi.apigw.ntruss.com/map-direction/v1/driving',
  start: Coord,
  goal: Coord,
  searchOption: OptionCode = OptionCode.traoptimal,
) {
  return fetch(
    `${url}?start=${start.longitude},${start.latitude}&goal=${goal.longitude},${goal.latitude}&option=${searchOption}`,
    {
      method: HttpMethods.GET,
      mode: 'cors',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'X-NCP-APIGW-API-KEY-ID': nmapKeyId,
        'X-NCP-APIGW-API-KEY': nmapKey,
      },
      referrer: 'no-referrer',
    },
  )
    .then((response) => {
      return response.json();
    })
    .then((json: IDirectionResponse) => {
      const route = json.route[searchOption];
      if (!route) {
        return null;
      }
      return route[0].path;
    });
}

export const loadGeocode = (params: IGeocodeParams) => {
  const url = `https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode${paramsToQueryString(
    params,
  )}`;
  console.log(url);
  return fetch(url, {
    method: HttpMethods.GET,
    mode: 'cors',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      'X-NCP-APIGW-API-KEY-ID': nmapKeyId,
      'X-NCP-APIGW-API-KEY': nmapKey,
    },
    referrer: 'no-referrer',
  });
};

export const loadKakaoAddress = (
  requestType: KakaoSearchKeywordType = 'keyword',
  params: IGeocodeParams,
) => {
  const queries: IKakaoQueryParams = {
    analyze_type: params.analyzeType || 'similar',
    query: params.query,
    page: params.page || 1,
    x: params.x,
    y: params.y,
    size: params.count,
  };
  // const apiUrl = `https://dapi.kakao.com/v2/local/search/address.json${paramsToQueryString(
  //   queries,
  // )}`;
  const apiUrl = `https://dapi.kakao.com/v2/local/search/${requestType}.json${paramsToQueryString(
    queries,
  )}`;
  console.log(apiUrl);
  return fetch(apiUrl, {
    method: HttpMethods.GET,
    mode: 'cors',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      Authorization: kakaoAddressKey,
    },
    referrer: 'no-referrer',
  });
};

export const loadReverseGeocode = (params: IReverseGeocodeParams) => {
  const queries = { ...params, coords: `${params.coords.longitude},${params.coords.latitude}` };
  const url = `https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc${paramsToQueryString(
    queries,
  )}`;
  console.log(url);
  return fetch(url, {
    method: HttpMethods.GET,
    mode: 'cors',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      'X-NCP-APIGW-API-KEY-ID': nmapKeyId,
      'X-NCP-APIGW-API-KEY': nmapKey,
    },
    referrer: 'no-referrer',
  });
};
