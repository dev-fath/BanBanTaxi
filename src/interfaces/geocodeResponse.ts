export interface IGeocodeResponse {
  statue: string;
  errorMessage?: string;
  meta?: GeocodeMeta;
  addresses?: IAddresses[];
}

interface GeocodeMeta {
  totalCount?: number;
  page?: number;
  count?: number;
}

export interface IAddresses {
  roadAddress?: string;
  jibunAddress?: string;
  englishAddress?: string;
  x?: string;
  y?: string;
  distance?: number;
  addressElements?: [];
}

export interface IReverseGeocodeResponse {
  status: { code: number; name: string; message: string };
  results: [
    {
      code: { id: string; type: string; mappingId: string };
      land: ILand;
      name: 'roadaddr';
      region: {
        // 행정구역
        area0: IArea; // 국가코드;
        area1: IArea; // 행정구역 단위 1 (시/도)
        area2: IArea; // 행정구역 단위 2 (시/군/구)
        area3: IArea; // 행정구역 단위 3 (읍/면/동)
        area4: IArea; // 행정구역 단위 4 (리)
      };
    },
  ];
}

export interface ILand {
  addition0: IAddressAdditionInfo; // 건물명
  addition1: IAddressAdditionInfo; // 우편번호
  addition2: IAddressAdditionInfo; // 길 그룹코드
  addition3: IAddressAdditionInfo;
  addition4: IAddressAdditionInfo;
  coords: ICoords;
  name: string;
  number1: string; // 길 번호
  number2: string; // 길 번호상세?
}
interface IArea {
  coords: ICoords;
  name: string;
}

interface ICoords {
  center: { crs: CoordinateSystemType; x: number; y: number };
}

interface IAddressAdditionInfo {
  type: string;
  value: string;
}

const coordinateSystem = {
  'epsg:4326': 'epsg:4326',
  'nhn:2048': 'nhn:2048',
  'nhn:128': 'nhn:128',
  'epsg:3857': 'epsg:3857',
} as const;
export type CoordinateSystemType = typeof coordinateSystem[keyof typeof coordinateSystem];
