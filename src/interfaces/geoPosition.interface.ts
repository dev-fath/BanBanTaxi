export interface IDirectionResponse {
  code: number;
  message: string;
  currentDateTime: string;
  route: {
    trafast?: [routeValue];
    tracomfort?: [routeValue];
    traoptimal?: [routeValue];
    traavoidtoll?: [routeValue];
    traavoidcaronly?: [routeValue];
  };
}

interface routeValue {
  summary: ISummary;
  path: [[number, number]];
  section?: ISection;
  guide?: {
    pointIndex: number;
    type: GuideCodeType;
    instruction?: string;
    distance: number;
    duration: number;
  };
}
interface ISummary {
  start: ILngLatPosition;
  goal: ILngLatPosition;
  waypoints?: [[number, number]];
  distance: number;
  duration: number;
  bbox: [[number, number], [number, number]];
  tollFare: number;
  taxiFare: number;
  fuelPrice: number;
}

interface ILngLatPosition {
  location: [number, number];
}

interface ISection {
  pointIndex: number;
  pointCount: number;
  distance: number;
  name: string;
  congestion?: CongestionCode;
  speed?: number;
}

enum CongestionCode {
  'noTraffic',
  'slow',
  'congestion',
}

export enum OptionCode {
  'trafast' = 'trafast',
  'tracomfort' = 'tracomfort',
  'traoptimal' = 'traoptimal',
  'traavoidtoll' = 'traavoidtoll',
  'traavoidcaronly' = 'traavoidcaronly',
}

const GuideCode = {
  '1': '직진 방향',
  '2': '좌회전',
  '3': '우회전',
  '4': '왼쪽 방향',
  '5': '오른쪽 방향',
  '6': 'U턴',
  '8': '비보호 좌회전',
  '11': '왼쪽 8시 방향',
  '12': '왼쪽 9시 방향',
  '13': '왼쪽 11시 방향',
  '14': '오른쪽 1시 방향',
  '15': '오른쪽 3시 방향',
  '16': '오른쪽 4시 방향',
  '21': '로터리에서 직진 방향',
  '22': '로터리에서 U턴',
  '23': '로터리에서 왼쪽 7시 방향',
  '24': '로터리에서 왼쪽 8시 방향',
  '25': '로터리에서 왼쪽 9시 방향',
  '26': '로터리에서 왼쪽 10시 방향',
  '27': '로터리에서 왼쪽 11시 방향',
  '28': '로터리에서 12시 방향',
  '29': '로터리에서 오른쪽 1시 방향',
  '30': '로터리에서 오른쪽 2시 방향',
  '31': '로터리에서 오른쪽 3시 방향',
  '32': '로터리에서 오른쪽 4시 방향',
  '33': '로터리에서 오른쪽 5시 방향',
  '34': '로터리에서 6시 방향',
  '41': '왼쪽 도로로 진입',
  '42': '오른쪽 도로로 진입',
  '47': '휴게소로 진입',
  '48': '페리항로 진입',
  '49': '페리항로 진출',
  '50': '전방에 고속도로 진입',
  '51': '전방에 고속도로 진출',
  '52': '전방에 도시고속도로 진입',
  '53': '전방에 도시고속도로 진출',
  '54': '전방에 분기도로 진입',
  '55': '전방에 고가차로 진입',
  '56': '전방에 지하차도 진입',
  '57': '왼쪽에 고속도로 진입',
  '58': '왼쪽에 고속도로 진출',
  '59': '왼쪽에 도시고속도로 진입',
  '60': '왼쪽에 도시고속도로 진출',
  '62': '왼쪽에 고가차도 진입',
  '63': '왼쪽에 고가차도 옆길',
  '64': '왼쪽에 지하차도 진입',
  '65': '왼쪽에 지하차도 옆길',
  '66': '오른쪽에 고속도로 진입',
  '67': '오른쪽에 고속도로 진출',
  '68': '오른쪽에 도시고속도로 진입',
  '69': '오른쪽에 도시고속도로 진출',
  '71': '오른쪽에 고가차로 진입',
  '72': '오른쪽에 고가차도 옆길',
  '73': '오른쪽에 지하차도 진입',
  '74': '오른쪽에 지하차도 옆길',
  '75': '전방에 자동차전용도로 진입',
  '76': '왼쪽에 자동차전용도로 진입',
  '77': '오른쪽에 자동차전용도로 진입',
  '78': '전방에 자동차전용도로 진출',
  '79': '왼쪽에 자동차전용도로 진출',
  '80': '오른쪽에 자동차전용도로 진출',
  '81': '왼쪽에 본선으로 합류',
  '82': '오른쪽에 본선으로 합류',
  '87': '경유지',
  '88': '도착지',
  '91': '회전교차로에서 직진 방향',
  '92': '회전교차로에서 U턴',
  '93': '회전교차로에서 왼쪽 7시 방향',
  '94': '회전교차로에서 왼쪽 8시 방향',
  '95': '회전교차로에서 왼쪽 9시 방향',
  '96': '회전교차로에서 왼쪽 10시 방향',
  '97': '회전교차로에서 왼쪽 11시 방향',
  '98': '회전교차로에서 12시 방향',
  '99': '회전교차로에서 오른쪽 1시 방향',
  '100': '회전교차로에서 오른쪽 2시 방향',
  '101': '회전교차로에서 오른쪽 3시 방향',
  '102': '회전교차로에서 오른쪽 4시 방향',
  '103': '회전교차로에서 오른쪽 5시 방향',
  '104': '회전교차로에서 6시 방향',
  '121': '톨게이트',
  '122': '하이패스전용 톨게이트',
  '123': '원톨링 톨게이트',
} as const;

type GuideCodeType = typeof GuideCode[keyof typeof GuideCode];
