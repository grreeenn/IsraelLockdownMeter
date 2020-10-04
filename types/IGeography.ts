export interface IAddress {
  coordinates: ICoordinates;
  readable: string;
}

export interface ICoordinates {
  lat: number;
  lon: number;
}
