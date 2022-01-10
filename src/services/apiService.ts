import { IDirectionResponse, IGeoPosition, OptionCode } from '../interfaces/geoPosition.interface';

export function getDirections(
  url = 'https://naveropenapi.apigw.ntruss.com/map-direction/v1/driving',
  start: IGeoPosition,
  goal: IGeoPosition,
  searchOption: OptionCode = OptionCode.traoptimal,
) {
  return fetch(
    `${url}?start=${start.lon},${start.lat}&goal=${goal.lon},${goal.lat}&option=${searchOption}`,
    {
      method: 'GET',
      mode: 'cors',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'X-NCP-APIGW-API-KEY-ID': 'gudascnpd4',
        'X-NCP-APIGW-API-KEY': 'sMXN9pmM2HJVr0GHQAIbkvkIjKqfZ8yn8HKIvUHd',
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
