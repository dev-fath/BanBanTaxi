import { Coord } from 'react-native-nmap/index';
import { IDirectionResponse, OptionCode } from '../../interfaces/geoPosition.interface';
import { paramsToQueryString } from '../../utils/paramsToQueryString';
import { CoordinateSystemType } from '../../interfaces/geocodeResponse';
import { HttpMethods } from '../apiService';

const nmapKeyId = 'gudascnpd4';
const nmapKey = 'sMXN9pmM2HJVr0GHQAIbkvkIjKqfZ8yn8HKIvUHd';

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

interface IGeocodeParams {
  keyword: string;
  coordinate?: string | unknown;
  filter?: string;
  page?: number;
  count?: number;
}

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

interface IReverseGeocodeParams {
  request?: 'coordsToaddr';
  coords: Coord;
  sourcecrs?: CoordinateSystemType;
  targetcrs?: CoordinateSystemType;
  orders?: ('legalcode' | 'admcode' | 'addr' | 'roadaddr')[];
  output?: 'json' | 'xml';
  callback?: 'string';
}
