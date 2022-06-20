export interface UserLocation {
  placeId?: string;
  lat: number | undefined;
  lng: number | undefined;
  description: string | undefined;
  entrance?: string;
  floor?: string;
  apartment?: string;
}

export interface UserLocationContainer {
  location: UserLocation | undefined;
}
