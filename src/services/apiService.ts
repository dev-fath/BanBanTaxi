import { IDirectionResponse, IGeoPosition, OptionCode } from '../interfaces/geoPosition.interface';
import { paramsToQueryString } from '../utils/paramsToQueryString';

const nmapKeyId = 'gudascnpd4';
const nmapKey = 'sMXN9pmM2HJVr0GHQAIbkvkIjKqfZ8yn8HKIvUHd';

const enum httpMethods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export function getDirections(
  url = 'https://naveropenapi.apigw.ntruss.com/map-direction/v1/driving',
  start: IGeoPosition,
  goal: IGeoPosition,
  searchOption: OptionCode = OptionCode.traoptimal,
) {
  return fetch(
    `${url}?start=${start.lon},${start.lat}&goal=${goal.lon},${goal.lat}&option=${searchOption}`,
    {
      method: httpMethods.GET,
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
    method: httpMethods.GET,
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
  query: string;
  coordinate?: string;
  filter?: string;
  page?: number;
  count?: number;
}
