export default interface ILocationService {
  requestCurrentPosition(): Promise<void>;

  requestPermissionLocation(): void;

  openSettings(): void;

  checkPermissionLocationAlways(): void;
}
