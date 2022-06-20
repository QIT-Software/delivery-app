import Session from '@spryrocks/react-auth/Session';
import RegisterRequest from './entities/RegisterRequest';
import LoginRequest from './entities/LoginRequest';
import {Account} from 'entities/Account';
import ForgotPasswordRequest from 'api/entities/ForgotPasswordRequest';
import Order from 'entities/Order';
import Client from 'entities/Client';
import Courier from 'entities/Courier';
import Restaurant from 'entities/Restaurant';
import Cuisine from 'entities/Cuisine';
import Dish from 'entities/Dish';
import Set from 'entities/Set';
import Status from 'entities/Status';
import {ID} from 'entities/Common';
import UpdateFirebaseTokenRequest from 'api/entities/UpdateFirebaseTokenRequest';
import UpdateUserInformationRequest from 'api/entities/UpdateUserInformationRequest';
import UpdateRestaurantInformationRequest from './entities/UpdateRestaurantInformationRequest';
import CreateRestaurantInformationRequest from './entities/CreateRestaurantInformationRequest';
import UpdateCuisineRequest from 'api/entities/UpdateCuisineRequest';
import CreateCuisineRequest from 'api/entities/CreateCuisineRequest';
import UpdateDishRequest from 'api/entities/UpdateDishRequest';
import CreateDishRequest from 'api/entities/CreateDishRequest';
import UpdateSetRequest from 'api/entities/UpdateSetRequest';
import CreateSetRequest from 'api/entities/CreateSetRequest';
import UpdateStatusRequest from 'api/entities/UpdateStatusRequest';
import CreateStatusRequest from 'api/entities/CreateStatusRequest';
import {DocumentsGroups, EvaluateDocumentsRevisionType} from 'entities/Documents';
import DistributeSetsByDaysRequest from './entities/DistributeSetsByDaysRequest';

export interface ISpoonAndForkApi {
  register(request: RegisterRequest): Promise<Session>;
  login(request: LoginRequest): Promise<Session>;
  myAccount(): Promise<Account>;
  uploadFile(file: File): Promise<void>;

  forgotPassword(request: ForgotPasswordRequest): Promise<void>;

  updateUserPassword(oldPassword: string, password: string): Promise<void>;
  updateUserProfileImage(imageId: string): Promise<void>;

  getOrders(): Promise<Order[]>;
  getOrderById(id: ID): Promise<Order>;

  getClients(): Promise<Client[]>;
  getClientById(id: ID): Promise<Client>;
  updateClientInformationRequest(request: UpdateUserInformationRequest): Promise<void>;

  getCouriers(): Promise<Courier[]>;
  getCourierById(id: ID): Promise<Courier>;
  updateCourierInformationRequest(request: UpdateUserInformationRequest): Promise<void>;

  getRestaurants(): Promise<Restaurant[]>;
  getRestaurantById(id: ID): Promise<Restaurant>;
  updateRestaurantRequest(request: UpdateRestaurantInformationRequest): Promise<void>;
  createRestaurantRequest(request: CreateRestaurantInformationRequest): Promise<void>;

  getCuisines(): Promise<Cuisine[]>;
  getCuisineById(id: string): Promise<Cuisine>;
  updateCuisineRequest(request: UpdateCuisineRequest): Promise<Cuisine>;
  createCuisineRequest(request: CreateCuisineRequest): Promise<void>;

  getDishes(): Promise<Dish[]>;
  getDishById(id: string): Promise<Dish>;
  updateDishRequest(request: UpdateDishRequest): Promise<Dish>;
  createDishRequest(request: CreateDishRequest): Promise<void>;

  getSets(): Promise<Set[]>;
  getSetById(id: string): Promise<Set>;
  getSetsByDishId(id: string): Promise<Set[]>;
  getSetsByCuisineId(id: string): Promise<Set[]>;
  updateSetRequest(request: UpdateSetRequest): Promise<Set>;
  createSetRequest(request: CreateSetRequest): Promise<void>;
  distributeSetsByDays(request: DistributeSetsByDaysRequest): Promise<void>;

  getStatuses(): Promise<Status[]>;
  getStatusById(id: string): Promise<Status>;
  updateStatusRequest(request: UpdateStatusRequest): Promise<Status>;
  createStatusRequest(request: CreateStatusRequest): Promise<void>;

  evaluateDocumentsRevision(
    revisionId: ID,
    type: EvaluateDocumentsRevisionType,
    comment: string,
  ): Promise<void>;

  getDocuments(revisionId: ID): Promise<DocumentsGroups>;

  updateFirebaseToken(request: UpdateFirebaseTokenRequest): Promise<void>;

  removeTheCurrentCourier(courierId: ID): Promise<void>;

  deleteOrder(orderId: ID): Promise<void>;
  deleteRestaurant(restaurantId: ID): Promise<void>;
  deleteCuisine(cuisineId: ID): Promise<void>;
  deleteDish(dishId: ID): Promise<void>;
  deleteSet(setId: ID): Promise<void>;
  deleteStatus(statusId: ID): Promise<void>;
}
