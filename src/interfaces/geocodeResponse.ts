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

interface IAddresses {
  roadAddress?: string;
  jibunAddress?: string;
  englishAddress?: string;
  x?: string;
  y?: string;
  distance?: number;
  addressElements?: [];
}
