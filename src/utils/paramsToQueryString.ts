/* eslint-disable */
export const paramsToQueryString = (params: any) => {
  return '?'+Object.keys(params)
    .map((key) => {
      return `${key}=${params[key]}`;
    })
    .join('&');
};
