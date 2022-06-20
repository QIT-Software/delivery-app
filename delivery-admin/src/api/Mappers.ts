import RegisterRequest from 'auth/RegisterRequest';
import ApiRegisterRequest from 'api/entities/RegisterRequest';
import LoginRequest from '@spryrocks/react-auth/LoginRequest';
import ApiLoginRequest from 'api/entities/LoginRequest';
import {Account} from 'entities/Account';
import User from 'entities/User';
import AdditionalUserInfo from 'entities/AdditionalUserInfo';
import {
  Account as GQLAccount,
  Address as GQLAddress,
  Cart as GQLCart,
  Set as GQLSet,
  Dish as GQLDish,
  Ingredient as GQLIngredient,
  Status as GQLStatus,
  OrderState as GQLOrderState,
  Bag as GQLBag,
  User as GQLUser,
  Order as GQLOrder,
  OrderInfo as GQLOrderInfo,
  Client as GQLClient,
  Courier as GQLCourier,
  Restaurant as GQLRestaurant,
  Cuisine as GQLCuisine,
  Document as GQLDocument,
  DocumentGroup as GQLDocumentGroup,
  DocumentsRevisionStatus as GQLDocumentsRevisionStatus,
  DocumentsRevision as GQLDocumentsRevision,
} from './graphql/types';
import Client from 'entities/Client';
import Courier from 'entities/Courier';
import Restaurant from 'entities/Restaurant';
import Cuisine from 'entities/Cuisine';
import Set from 'entities/Set';
import Dish from 'entities/Dish';
import Ingredient from 'entities/Ingredient';
import Status from 'entities/Status';
import Order, {OrderState} from 'entities/Order';
import {Bag} from 'entities/Bag';
import Address from 'entities/Address';
import Cart from 'entities/Cart';
import OrderInfo from '../entities/OrderInfo';
import UpdateCuisineRequest from 'state/entities/UpdateCuisineRequest';
import ApiUpdateCuisineRequest from 'api/entities/UpdateCuisineRequest';
import CreateCuisineRequest from 'state/entities/CreateCuisineRequest';
import ApiCreateCuisineRequest from 'api/entities/CreateCuisineRequest';
import UpdateStatusRequest from 'state/entities/UpdateStatusRequest';
import ApiUpdateStatusRequest from 'api/entities/UpdateStatusRequest';
import CreateStatusRequest from 'state/entities/CreateStatusRequest';
import ApiCreateStatusRequest from 'api/entities/CreateStatusRequest';
import UpdateDishRequest from 'state/entities/UpdateDishRequest';
import ApiUpdateDishRequest from 'api/entities/UpdateDishRequest';
import CreateDishRequest from 'state/entities/CreateDishRequest';
import ApiCreateDishRequest from 'api/entities/CreateDishRequest';
import UpdateSetRequest from 'state/entities/UpdateSetRequest';
import ApiUpdateSetRequest from 'api/entities/UpdateSetRequest';
import CreateSetRequest from 'state/entities/CreateSetRequest';
import ApiCreateSetRequest from 'api/entities/CreateSetRequest';
import UpdateUserInformationRequest from 'api/entities/UpdateUserInformationRequest';
import UpdateRestaurantRequest from 'state/entities/UpdateRestaurantRequest';
import ApiUpdateRestaurantRequest from 'api/entities/UpdateRestaurantInformationRequest';
import CreateRestaurantRequest from 'state/entities/CreateRestaurantRequest';
import ApiCreateRestaurantRequest from 'api/entities/CreateRestaurantInformationRequest';
import {
  Document,
  DocumentsRevision,
  DocumentsRevisionStatus,
  DocumentsGroups,
} from 'entities/Documents';
import ApiConfiguration, {
  getApiConnectionOptions,
} from '@spryrocks/react-api/ApiConfiguration';
import * as R from 'ramda';

export const mapRegisterRequestToApi = (
  registerRequest: RegisterRequest,
): ApiRegisterRequest => ({
  name: registerRequest.name,
  email: registerRequest.email,
  phoneNumber: registerRequest.phoneNumber,
  password: registerRequest.password,
});

export const mapUpdateRestaurantRequestToGQL = (
  updateRestaurantRequest: UpdateRestaurantRequest,
  uploadFileId: string,
): ApiUpdateRestaurantRequest => {
  return {
    id: updateRestaurantRequest.id,
    name: updateRestaurantRequest.name,
    email: updateRestaurantRequest.email,
    phoneNumber: updateRestaurantRequest.phoneNumber,
    placeId: updateRestaurantRequest.placeId,
    lat: updateRestaurantRequest.lat,
    lng: updateRestaurantRequest.lng,
    addressDescription: updateRestaurantRequest.addressDescription,
    title: updateRestaurantRequest.title,
    restaurantDescription: updateRestaurantRequest.restaurantDescription,
    cuisines: updateRestaurantRequest.cuisines,
    image: uploadFileId,
  };
};

export const mapCreateRestaurantRequestToGQL = (
  createRestaurantRequest: CreateRestaurantRequest,
  uploadFileId: string,
): ApiCreateRestaurantRequest => ({
  name: createRestaurantRequest.name,
  email: createRestaurantRequest.email,
  phoneNumber: createRestaurantRequest.phoneNumber,
  password: createRestaurantRequest.password,
  placeId: createRestaurantRequest.placeId,
  lat: createRestaurantRequest.lat,
  lng: createRestaurantRequest.lng,
  addressDescription: createRestaurantRequest.addressDescription,
  title: createRestaurantRequest.title,
  restaurantDescription: createRestaurantRequest.restaurantDescription,
  cuisines: createRestaurantRequest.cuisines,
  image: uploadFileId,
});

export const mapUpdateCuisineRequestToGQL = (
  updateCuisineRequest: UpdateCuisineRequest,
  uploadFileId: string,
): ApiUpdateCuisineRequest => {
  return {
    id: updateCuisineRequest.id,
    image: uploadFileId,
    nationality: updateCuisineRequest.nationality,
  };
};

export const mapCreateCuisineRequestToGQL = (
  createCuisineRequest: CreateCuisineRequest,
  uploadFileId: string,
): ApiCreateCuisineRequest => ({
  image: uploadFileId,
  nationality: createCuisineRequest.nationality,
});

export const mapUpdateStatusRequestToGQL = (
  updateStatusRequest: UpdateStatusRequest,
  uploadFileId: string,
): ApiUpdateStatusRequest => {
  return {
    id: updateStatusRequest.id,
    image: uploadFileId,
    name: updateStatusRequest.name,
  };
};

export const mapCreateStatusRequestToGQL = (
  createStatusRequest: CreateStatusRequest,
  uploadFileId: string,
): ApiCreateStatusRequest => ({
  image: uploadFileId,
  name: createStatusRequest.name,
});

export const mapUpdateDishRequestToGQL = (
  updateDishRequest: UpdateDishRequest,
  uploadFileId: string,
): ApiUpdateDishRequest => ({
  id: updateDishRequest.id,
  image: uploadFileId,
  name: updateDishRequest.name,
  description: updateDishRequest.description,
  weight: updateDishRequest.weight,
  kal: updateDishRequest.kal,
  ingredients: updateDishRequest.ingredients,
  sets: updateDishRequest.sets,
});

export const mapCreateDishRequestToGQL = (
  createDishRequest: CreateDishRequest,
  uploadFileId: string,
): ApiCreateDishRequest => ({
  image: uploadFileId,
  name: createDishRequest.name,
  description: createDishRequest.description,
  weight: createDishRequest.weight,
  kal: createDishRequest.kal,
  ingredients: createDishRequest.ingredients,
  sets: createDishRequest.sets,
});

export const mapUpdateSetRequestToGQL = (
  updateSetRequest: UpdateSetRequest,
  uploadFileId: string,
): ApiUpdateSetRequest => ({
  id: updateSetRequest.id,
  image: uploadFileId,
  name: updateSetRequest.name,
  cuisineId: updateSetRequest.cuisineId,
  priceCents: updateSetRequest.priceCents,
  dishes: updateSetRequest.dishes,
  statuses: updateSetRequest.statuses,
});

export const mapCreateSetRequestToGQL = (
  createSetRequest: CreateSetRequest,
  uploadFileId: string,
): ApiCreateSetRequest => ({
  image: uploadFileId,
  name: createSetRequest.name,
  cuisineId: createSetRequest.cuisineId,
  priceCents: createSetRequest.priceCents,
  dishes: createSetRequest.dishes,
  statuses: createSetRequest.statuses,
});

export const mapUpdateClientInformationRequestToGQL = (
  updateClientInformationRequest: UpdateUserInformationRequest,
): UpdateUserInformationRequest => ({
  id: updateClientInformationRequest.id,
  name: updateClientInformationRequest.name,
  email: updateClientInformationRequest.email,
  phoneNumber: updateClientInformationRequest.phoneNumber,
});

export const mapUpdateCourierInformationRequestToGQL = (
  updateCourierInformationRequest: UpdateUserInformationRequest,
): UpdateUserInformationRequest => ({
  id: updateCourierInformationRequest.id,
  name: updateCourierInformationRequest.name,
  email: updateCourierInformationRequest.email,
  phoneNumber: updateCourierInformationRequest.phoneNumber,
});

export const mapLoginRequestToApi = (loginRequest: LoginRequest): ApiLoginRequest => ({
  email: loginRequest.email,
  password: loginRequest.password,
});

export const mapAdditionalUserInfoFromGQL = (
  additionalInfo: AdditionalUserInfo,
): AdditionalUserInfo => ({
  email: additionalInfo.email,
  phoneNumber: additionalInfo.phoneNumber,
});

export const mapImageFromGQL = (
  configuration: ApiConfiguration,
  imageId: string,
): string => {
  if (!configuration.rest) throw new Error('Rest config should be provided');
  const {baseUrl} = getApiConnectionOptions(configuration);
  return `${baseUrl}${configuration.rest.path}/files/${imageId}`;
};

export const mapUserFromGQL = (user: GQLUser): User => ({
  id: user.id,
  name: user.name,
  additionalInfo: user.additionalUserInfo
    ? mapAdditionalUserInfoFromGQL(user.additionalUserInfo)
    : undefined,
});

export const mapMyAccountFromGQL = (account: GQLAccount): Account => ({
  info: mapAdditionalUserInfoFromGQL(account.info),
  user: mapUserFromGQL(account.user),
});

export const mapAddressFromGQL = (location: GQLAddress): Address => ({
  id: location.id,
  palaceId: location.placeId || undefined,
  description: location.description,
  lat: location.lat,
  lng: location.lng,
});

export const mapOrderInfoFromGQL = (orderInfo: GQLOrderInfo): OrderInfo => ({
  id: orderInfo.id,
  priceCents: orderInfo.priceCents,
  distanceMiles: orderInfo.distanceMiles,
  clientAddress: mapAddressFromGQL(orderInfo.clientAddress),
});

export const mapClientFromGQL = (
  configuration: ApiConfiguration,
  client: GQLClient,
): Client => ({
  id: client.id,
  user: mapUserFromGQL(client.user),
});

export const mapDocumentsRevisionStatusFromGQL = (
  status: GQLDocumentsRevisionStatus,
): DocumentsRevisionStatus => {
  switch (status) {
    case GQLDocumentsRevisionStatus.New:
      return DocumentsRevisionStatus.New;
    case GQLDocumentsRevisionStatus.VerificationRequested:
      return DocumentsRevisionStatus.VerificationRequested;
    case GQLDocumentsRevisionStatus.ChangesRequested:
      return DocumentsRevisionStatus.ChangesRequested;
    case GQLDocumentsRevisionStatus.Approved:
      return DocumentsRevisionStatus.Approved;
    case GQLDocumentsRevisionStatus.Rejected:
      return DocumentsRevisionStatus.Rejected;
  }
};

export const mapDocumentFromGQL = (
  configuration: ApiConfiguration,
  document: GQLDocument,
): Document => ({
  id: document.id,
  image: mapImageFromGQL(configuration, document.fileId),
});

export const mapDocumentsFromGQL = (
  configuration: ApiConfiguration,
  documents: GQLDocument[],
): Document[] => documents.map((d) => mapDocumentFromGQL(configuration, d));

export const mapDocumentsRevisionFromGQL = (
  configuration: ApiConfiguration,
  revision: GQLDocumentsRevision,
): DocumentsRevision => {
  return {
    id: revision.id,
    status: mapDocumentsRevisionStatusFromGQL(revision.status),
    comment: revision.comment,
  };
};

export const mapCourierFromGQL = (
  configuration: ApiConfiguration,
  courier: GQLCourier,
): Courier => ({
  id: courier.id,
  user: mapUserFromGQL(courier.user),
  revision: courier.revision
    ? mapDocumentsRevisionFromGQL(configuration, courier.revision)
    : undefined,
});

export const groupDocumentFromGQL = (
  configuration: ApiConfiguration,
  documents: GQLDocument[],
): DocumentsGroups => {
  const groupSelector = ({group}: GQLDocument) => group;
  const groups = R.groupBy(groupSelector)(documents);
  return {
    w4: groups[GQLDocumentGroup.W4]
      ? mapDocumentsFromGQL(configuration, groups[GQLDocumentGroup.W4])
      : [],
    licensePlate: groups[GQLDocumentGroup.LicensePlate]
      ? mapDocumentsFromGQL(configuration, groups[GQLDocumentGroup.LicensePlate])
      : [],
    driversLicense: groups[GQLDocumentGroup.DriversLicense]
      ? mapDocumentsFromGQL(configuration, groups[GQLDocumentGroup.DriversLicense])
      : [],
    carRegistration: groups[GQLDocumentGroup.CarRegistration]
      ? mapDocumentsFromGQL(configuration, groups[GQLDocumentGroup.CarRegistration])
      : [],
    carInsurance: groups[GQLDocumentGroup.CarInsurance]
      ? mapDocumentsFromGQL(configuration, groups[GQLDocumentGroup.CarInsurance])
      : [],
  };
};

export const mapCuisineFromGQL = (
  configuration: ApiConfiguration,
  cuisine: GQLCuisine,
): Cuisine => ({
  id: cuisine.id,
  image: mapImageFromGQL(configuration, cuisine.imageId),
  nationality: cuisine.nationality,
  rating: cuisine.rating || '-',
});

export const mapCuisinesFromGQL = (
  configuration: ApiConfiguration,
  cuisines: GQLCuisine[],
): Cuisine[] => cuisines.map((cuisine) => mapCuisineFromGQL(configuration, cuisine));

export const mapRestaurantFromGQL = (
  configuration: ApiConfiguration,
  restaurant: GQLRestaurant,
): Restaurant => {
  return {
    id: restaurant.id,
    user: mapUserFromGQL(restaurant.user),
    image: mapImageFromGQL(configuration, restaurant.imageId),
    title: restaurant.title,
    description: restaurant.description,
    address: mapAddressFromGQL(restaurant.address),
    cuisines: mapCuisinesFromGQL(configuration, restaurant.cuisines),
  };
};

export const mapBagFromGQL = (bag: GQLBag): Bag => ({
  id: bag.id,
  code: bag.code,
});

export const mapBagsFromGQL = (bags: GQLBag[]): Bag[] =>
  bags.map((bag) => mapBagFromGQL(bag));

export const mapCartFromGQL = (cart: GQLCart): Cart => ({
  id: cart.id,
  userId: cart.userId,
});

export const mapIngredientFromGQL = (ingredient: GQLIngredient): Ingredient => ({
  id: ingredient.id,
  name: ingredient.name,
});

export const mapIngredientsFromGQL = (ingredients: GQLIngredient[]): Ingredient[] => {
  return ingredients.map((ingredient) => mapIngredientFromGQL(ingredient));
};

export const mapDishFromGQL = (configuration: ApiConfiguration, dish: GQLDish): Dish => ({
  id: dish.id,
  name: dish.name,
  description: dish.description,
  image: mapImageFromGQL(configuration, dish.imageId),
  weight: dish.weight,
  kal: dish.kal,
  ingredients: mapIngredientsFromGQL(dish.ingredients),
});

export const mapDishesFromGQL = (
  configuration: ApiConfiguration,
  dishes: GQLDish[],
): Dish[] => {
  return dishes.map((dish) => mapDishFromGQL(configuration, dish));
};

export const mapStatusFromGQL = (
  configuration: ApiConfiguration,
  status: GQLStatus,
): Status => ({
  id: status.id,
  name: status.name,
  image: mapImageFromGQL(configuration, status.imageId),
});

export const mapStatusesFromGQL = (
  configuration: ApiConfiguration,
  statuses: GQLStatus[],
): Status[] => {
  return statuses.map((status) => mapStatusFromGQL(configuration, status));
};

export const mapSetFromGQL = (configuration: ApiConfiguration, set: GQLSet): Set => ({
  id: set.id,
  name: set.name,
  image: mapImageFromGQL(configuration, set.imageId),
  priceCents: set.priceCents,
  cuisineId: set.cuisineId,
  dishes: mapDishesFromGQL(configuration, set.dishes),
  statuses: mapStatusesFromGQL(configuration, set.statuses),
  day: set.day,
  isFavorite: set.isFavorite,
});

export const mapSetsFromGQL = (
  configuration: ApiConfiguration,
  sets: GQLSet[],
): Set[] => {
  return sets.map((set) => mapSetFromGQL(configuration, set));
};

export const mapOrderStateFromGQL = (orderState: GQLOrderState): OrderState => {
  switch (orderState) {
    case 'WaitingForPayment':
      return OrderState.WaitingForPayment;
    case 'ReadyForDelivery':
      return OrderState.ReadyForDelivery;
    case 'AcceptedByCourier':
      return OrderState.AcceptedByCourier;
    case 'Delivering':
      return OrderState.Delivering;
    case 'Delivered':
      return OrderState.Delivered;
    case 'Completed':
      return OrderState.Completed;
    default:
      throw new Error('Not implemented');
  }
};

export const mapOrderFromGQL = (
  configuration: ApiConfiguration,
  order: GQLOrder,
): Order => ({
  id: order.id,
  restaurant: mapRestaurantFromGQL(configuration, order.restaurant),
  client: mapUserFromGQL(order.client),
  cart: mapCartFromGQL(order.cart),
  bag: order.bag ? mapBagFromGQL(order.bag) : undefined,
  set: mapSetFromGQL(configuration, order.set),
  orderInfo: mapOrderInfoFromGQL(order.orderInfo),
  number: order.number,
  created: order.created,
  placement: order.placement,
  state: mapOrderStateFromGQL(order.state),
  courierId: order.courierId ? order.courierId : undefined,
  courier: order.courier ? mapCourierFromGQL(configuration, order.courier) : undefined,
  rating: order.rating ? order.rating : undefined,
});

export const mapOrdersFromGQL = (
  configuration: ApiConfiguration,
  orders: GQLOrder[],
): Order[] => orders.map((order) => mapOrderFromGQL(configuration, order));

export const mapClientsFromGQL = (
  configuration: ApiConfiguration,
  clients: GQLClient[],
): Client[] => clients.map((client) => mapClientFromGQL(configuration, client));

export const mapCouriersFromGQL = (
  configuration: ApiConfiguration,
  couriers: GQLCourier[],
): Courier[] => couriers.map((courier) => mapCourierFromGQL(configuration, courier));

export const mapRestaurantsFromGQL = (
  configuration: ApiConfiguration,
  restaurants: GQLRestaurant[],
): Restaurant[] =>
  restaurants.map((restaurant) => {
    return mapRestaurantFromGQL(configuration, restaurant);
  });
