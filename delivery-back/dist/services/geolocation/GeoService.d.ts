import IGeoService from './IGeoService';
import LatLng from '../../entities/LatLng';
export default class GeoService extends IGeoService {
    getDistanceMeters(origin: LatLng, destination: LatLng): Promise<number>;
}
