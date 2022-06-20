export default interface Address {
  id: string;
  palaceId: string | undefined;
  description: string;
  entrance?: string;
  floor?: string;
  apartment?: string;
  lat: number;
  lng: number;
}
