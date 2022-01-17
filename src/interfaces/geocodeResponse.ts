export interface IGeocodeResponse {
  status: string;
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
  placeName?: string;
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

export interface IKakaoAddressResponse {
  meta: {
    is_end: boolean;
    pageable_count: number;
    total_count: number;
  };
  documents: IKakaoAddressDocuments[];
}

export interface IKakaoAddressDocuments {
  place_name?: string;
  address_name: string;
  road_address_name: string;
  address_type: AddressType;
  x: string; //	X 좌표값, 경위도인 경우 경도(longitude)
  y: string; //	Y 좌표값, 경위도인 경우 위도(latitude)
  address: IKakaoAddress; //	지번 주소 상세 정보
  road_address: IKakaoRoadAddress; //	도로명 주소 상세 정보, 아래 RoadAaddress 참고
}

interface IKakaoAddress {
  address_name: string; //	전체 지번 주소
  region_1depth_name: string; //	지역 1 Depth, 시도 단위
  region_2depth_name: string; //	지역 2 Depth, 구 단위
  region_3depth_name: string; //	지역 3 Depth, 동 단위
  region_3depth_h_name: string; //	지역 3 Depth, 행정동 명칭
  h_code: string; //	행정 코드
  b_code: string; //	법정 코드
  mountain_yn: string; //	산 여부, Y 또는 N
  main_address_no: string; //	지번 주번지
  sub_address_no: string; //	지번 부번지, 없을 경우 빈 문자열("") 반환
  x: string; //	X 좌표값, 경위도인 경우 경도(longitude)
  y: string; //	Y 좌표값, 경위도인 경우 위도(latitude)
}
interface IKakaoRoadAddress {
  address_name: string; //	전체 도로명 주소
  region_1depth_name: string; //	지역명1
  region_2depth_name: string; //	지역명2
  region_3depth_name: string; //	지역명3
  road_name: string; //	도로명
  underground_yn: string; //	지하 여부, Y 또는 N
  main_building_no: string; //	건물 본번
  sub_building_no: string; //	건물 부번, 없을 경우 빈 문자열("") 반환
  building_name: string; //	건물 이름
  zone_no: string; //	우편번호(5자리)
  x: string; //	X 좌표값, 경위도인 경우 경도(longitude)
  y: string; //	Y 좌표값, 경위도인 경우 위도(latitude)
}

const addressTypes = {
  REGION: 'REGION', // 지명
  ROAD: 'ROAD', // 도로명
  REGION_ADDR: 'REGION_ADDR', // 지번 주소
  ROAD_ADDR: 'ROAD_ADDR', // 도로명 주소
} as const;

type AddressType = typeof addressTypes[keyof typeof addressTypes];

export type KakaoSearchKeywordType = 'keyword' | 'address' | 'category';
