import IRoadService from 'services/googleRoads/IRoadsService';
import { GoogleMapsClientWithPromise } from '@google/maps';
import LatLng from '../../entities/LatLng';
export default class RoadsService extends IRoadService {
    private readonly client;
    constructor(client: GoogleMapsClientWithPromise);
    getDistanceMeters(origin: LatLng, destination: LatLng): Promise<number>;
}
