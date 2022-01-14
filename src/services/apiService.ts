import { paramsToQueryString } from '../utils/paramsToQueryString';

export const enum HttpMethods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

interface IGetParameters {
  url: string;
  mode: 'cors' | 'no-cors';
  query: IGetQueries;
}
interface IGetQueries {
  [key: string]: unknown;
}
export function get<T>(params: IGetParameters) {
  const headers = { 'Content-Type': 'application/json' };
  return fetch(`${params.url}${paramsToQueryString(params.query)}`, {
    method: HttpMethods.GET,
    mode: 'cors',
    credentials: 'same-origin',
    headers: headers,
    referrer: 'no-referrer',
  })
    .then<T>((result) => result.json())
    .then((data) => data);
}
