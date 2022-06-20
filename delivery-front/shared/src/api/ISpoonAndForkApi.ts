import RegisterRequest from './entities/RegisterRequest';
import LoginRequest from './entities/LoginRequest';
import ForgotPasswordRequest from 'api/entities/ForgotPasswordRequest';
import UpdateFirebaseTokenRequest from 'api/entities/UpdateFirebaseTokenRequest';
import Session from '@spryrocks/react-auth/Session';
import Cuisine from 'entities/Cuisine';
import Set from 'entities/Set';
import Cart from 'entities/Cart';
import Order from 'entities/Order';
import UpdatePreferences from './entities/UpdatePreferences';
import Preferences from '../../../client/src/state/entities/Preferences';
import {Account} from 'entities/Account';
import {Bag} from 'entities/Bag';
import CreateCartRequest from 'api/entities/CreateCartRequest';
import LatLng from 'entities/LatLng';
import {UserLocation} from 'state/entities/UserAddress';
import Address from 'entities/Address';
import {DocumentsGroup, DocumentsGroups, DocumentsRevision} from 'entities/Documents';
import {ID} from 'entities/Common';
import UpdateUserRequest from 'state/ducks/session/models';
import Restaurant from 'entities/Restaurant';
import {EmailForSpam} from 'state/entities/EmailForSpam';
import EmailsForSpam from 'entities/EmailsForSpam';

export interface ISpoonAndForkApi {
  register(request: RegisterRequest): Promise<Session>;
  login(request: LoginRequest): Promise<Session>;
  forgotPassword(request: ForgotPasswordRequest): Promise<void>;
  myAccount(): Promise<Account>;
  updateFirebaseToken(request: UpdateFirebaseTokenRequest): Promise<void>;
  getCuisineList(): Promise<Cuisine[]>;
  getSetsByCuisineId(cuisineId: string): Promise<Set[]>;
  getSetById(setId: string): Promise<Set>;
  findBagByCode(code: string): Promise<Bag>;
  getBagsByOrderId(id: string): Promise<Bag[]>;
  updateUserProfile(updateRequest: UpdateUserRequest): Promise<Account>;
  createAddress(address: UserLocation): Promise<Address>;
  createEmailForSpam(email: EmailForSpam): Promise<EmailsForSpam>;
  acceptOrder(orderId: string): Promise<void>;
  markOrder(orderId: string, bag: string): Promise<void>;
  getOrdersForDelivery(): Promise<Order[]>;
  getOrdersByCourierId(): Promise<Order[]>;
  getClientOrdersAddresses(): Promise<Address[]>;
  getOrderById(id: string): Promise<Order>;
  getOrdersByCartId(cartId: string): Promise<Order[]>;
  getOrdersByRestaurantId(): Promise<Order[]>;
  getOrdersByUserId(): Promise<Order[]>;
  preferences(): Promise<Preferences>;
  updatePreferences(request: UpdatePreferences): Promise<Preferences>;
  createCart(request: CreateCartRequest): Promise<Cart>;
  getUserCarts(): Promise<Cart[]>;
  getSets(): Promise<Set[]>;
  getRestaurant(): Promise<Restaurant>;
  getDistanceToRestaurant(
    restaurantId: string,
    lat: number,
    lng: number,
  ): Promise<number>;
  getUserLocation(id: string): Promise<LatLng | undefined>;
  updateUserLocation(latLng: LatLng): Promise<void>;
  getCurrentRevision(): Promise<DocumentsRevision | undefined>;
  requestDocumentsRevisionVerification(revisionId: string): Promise<void>;
  addDocuments(fileId: string, group: DocumentsGroup): Promise<Document>;
  deleteDocument(documentId: string): Promise<void>;
  getDocuments(revisionId: ID): Promise<DocumentsGroups>;
  uploadFile(uri: string): Promise<string>;
  updateUserProfileImage(imageId: string): Promise<void>;
}
