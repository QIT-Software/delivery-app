import RegisterRequest from 'auth/RegisterRequest';
import ApiRegisterRequest from 'api/entities/RegisterRequest';
import LoginRequest from '@spryrocks/react-auth/LoginRequest';
import ApiLoginRequest from 'api/entities/LoginRequest';
import Cuisine from 'entities/Cuisine';
import Set from 'entities/Set';
import Order, {OrderState} from 'entities/Order';
import Category from 'entities/Category';
import Dish from 'entities/Dish';
import Ingredient from 'entities/Ingredient';
import Status from 'entities/Status';
import {Bag} from 'entities/Bag';
import User from 'entities/User';
import {Account} from 'entities/Account';
import AdditionalUserInfo from 'entities/AdditionalUserInfo';
import OrderInfo from 'entities/OrderInfo';
import Address from 'entities/Address';
import Restaurant from 'entities/Restaurant';
import Courier from 'entities/Courier';
import R from 'ramda';
import {
  Cuisine as GQLCuisine,
  Category as GQLCategory,
  Set as GQLSet,
  Dish as GQLDish,
  Status as GQLStatus,
  Ingredient as GQLIngredient,
  Order as GQLOrder,
  User as UserGQL,
  OrderInfo as GQLOrderInfo,
  Address as GQLAddress,
  Restaurant as GQLRestaurant,
  OrderState as GQLOrderState,
  CartState as GQLCartState,
  Courier as GQLCourier,
  Preferences as GQLPreferences,
  Cart as GQLCart,
  SelectedSetInfo as GQLSelectedSetInfo,
  LatLng as GQLLatLng,
  Document as GQLDocument,
  DocumentGroup as GQLDocumentGroup,
  DocumentsRevision as GQLDocumentsRevision,
  DocumentsRevisionStatus as GQLDocumentsRevisionStatus,
  EmailForSpam as GQLEmailForSpam,
  MutationCreateCartArgs,
} from './graphql/types';
import Preferences from 'state/entities/Preferences';
import CreateCartRequest from 'api/entities/CreateCartRequest';
import Cart, {CartState} from 'entities/Cart';
import SelectedSetInfo from 'entities/SelectedSetsInfo';
import LatLng from 'entities/LatLng';
import {
  Document,
  DocumentsGroup,
  DocumentsGroups,
  DocumentsRevision,
  DocumentsRevisionStatus,
} from 'entities/Documents';
import ApiConfiguration, {
  getApiConnectionOptions,
} from '@spryrocks/react-api/ApiConfiguration';
import {EmailForSpam} from 'state/entities/EmailForSpam';
import EmailsForSpam from 'entities/EmailsForSpam';

export const mapBagFromGQL = (bag: Bag): Bag => ({
  id: bag.id,
  code: bag.code,
});

export const mapCartStateFromGQL = (cartState: GQLCartState): CartState => {
  switch (cartState) {
    case 'Active':
      return CartState.Active;
    case 'Delivered':
      return CartState.Delivered;
    default:
      throw new Error('Not implemented');
  }
};

export const mapCartFromGQL = (cart: GQLCart): Cart => ({
  id: cart.id,
  userId: cart.userId,
  status: mapCartStateFromGQL(cart.status),
});

export const mapCartsFromGQL = (carts: GQLCart[]): Cart[] =>
  carts.map((cart) => mapCartFromGQL(cart));

export const mapImageFromGQL = (
  configuration: ApiConfiguration,
  imageId: string,
): string => {
  if (!configuration.rest) throw new Error('Rest config should be provided');
  const {baseUrl} = getApiConnectionOptions(configuration);
  return `${baseUrl}${configuration.rest.path}/files/${imageId}`;
};

export const mapBagsFromGQL = (bags: Bag[]): Bag[] =>
  bags.map((bag) => mapBagFromGQL(bag));

export const mapRegisterRequestToApi = (
  registerRequest: RegisterRequest,
): ApiRegisterRequest => ({
  name: registerRequest.name,
  email: registerRequest.email,
  password: registerRequest.password,
  phoneNumber: registerRequest.phoneNumber,
});

export const mapLoginRequestToApi = (loginRequest: LoginRequest): ApiLoginRequest => ({
  email: loginRequest.email,
  password: loginRequest.password,
});

export const mapIngredientFromGQL = (ingredient: GQLIngredient): Ingredient => ({
  id: ingredient.id,
  name: ingredient.name,
});

export const mapIngredientsFromGQL = (ingredients: GQLIngredient[]): Ingredient[] => {
  return ingredients.map((ingredient) => mapIngredientFromGQL(ingredient));
};

export const mapStatusFromGQL = (
  configuration: ApiConfiguration,
  status: GQLStatus,
): Status => ({
  id: status.id,
  name: status.name,
  imageId: mapImageFromGQL(configuration, status.imageId),
});

export const mapStatusesFromGQL = (
  configuration: ApiConfiguration,
  statuses: GQLStatus[],
): Status[] => {
  return statuses.map((status) => mapStatusFromGQL(configuration, status));
};

export const mapDishFromGQL = (configuration: ApiConfiguration, dish: GQLDish): Dish => ({
  id: dish.id,
  name: dish.name,
  description: dish.description,
  imageId: mapImageFromGQL(configuration, dish.imageId),
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

export const mapCuisineCategoryFromGQL = (category: GQLCategory): Category => ({
  id: category.id,
  name: category.name,
});

export const mapCuisineCategoriesFromGQL = (categories: GQLCategory[]): Category[] => {
  return categories.map((category) => mapCuisineCategoryFromGQL(category));
};

export const mapCuisineFromGQL = (
  configuration: ApiConfiguration,
  cuisine: GQLCuisine,
): Cuisine => ({
  id: cuisine.id,
  image: mapImageFromGQL(configuration, cuisine.imageId),
  nationality: cuisine.nationality,
  rating: cuisine.rating,
});

export const mapCuisineListFromGQL = (
  configuration: ApiConfiguration,
  cuisines: GQLCuisine[],
): Cuisine[] => {
  return cuisines.map((cuisine) => mapCuisineFromGQL(configuration, cuisine));
};

export const mapSetFromGQL = (configuration: ApiConfiguration, set: GQLSet): Set => ({
  id: set.id,
  name: set.name,
  imageId: mapImageFromGQL(configuration, set.imageId),
  priceCents: set.priceCents,
  cuisineId: set.cuisineId,
  dishes: mapDishesFromGQL(configuration, set.dishes),
  statuses: mapStatusesFromGQL(configuration, set.statuses),
  day: set.day,
  isFavorite: set.isFavorite,
});

export const mapSetsFromGQL = (
  configuration: ApiConfiguration,
  setItems: GQLSet[],
): Set[] => {
  return setItems.map((set) => mapSetFromGQL(configuration, set));
};

export const mapAdditionalUserInfoFromGQL = (
  additionalInfo: AdditionalUserInfo,
): AdditionalUserInfo => ({
  email: additionalInfo.email,
  phoneNumber: additionalInfo.phoneNumber,
});

export const mapUserFromGQL = (configuration: ApiConfiguration, user: UserGQL): User => ({
  id: user.id,
  name: user.name,
  additionalInfo: user.additionalUserInfo
    ? mapAdditionalUserInfoFromGQL(user.additionalUserInfo)
    : undefined,
  image: user.image ? mapImageFromGQL(configuration, user.image) : undefined,
});

export const mapMyAccountFromGQL = (
  configuration: ApiConfiguration,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  account: any,
): Account => ({
  info: mapAdditionalUserInfoFromGQL(account.info),
  user: mapUserFromGQL(configuration, account.user),
});

export const mapAddressFromGQL = (location: GQLAddress): Address => ({
  id: location.id,
  palaceId: location.placeId || undefined,
  description: location.description,
  entrance: location.entrance || undefined,
  floor: location.floor || undefined,
  apartment: location.apartment || undefined,
  lat: location.lat,
  lng: location.lng,
});

export const mapEmailForSpamFromGQL = (email: GQLEmailForSpam): EmailsForSpam => ({
  id: email.id,
  email: email.email,
  isDiscount: email.isDiscount,
});

export const mapAddressesFromGQL = (addresses: GQLAddress[]): Address[] =>
  addresses.map((address) => mapAddressFromGQL(address));

export const mapOrderInfoFromGQL = (orderInfo: GQLOrderInfo): OrderInfo => ({
  id: orderInfo.id,
  weight: orderInfo.weight,
  priceCents: orderInfo.priceCents,
  distanceMiles: orderInfo.distanceMiles,
  clientAddress: mapAddressFromGQL(orderInfo.clientAddress),
});

export const mapRestaurantFromGQL = (
  configuration: ApiConfiguration,
  restaurant: GQLRestaurant,
): Restaurant => ({
  id: restaurant.id,
  userId: restaurant.userId,
  imageId: restaurant.imageId,
  description: restaurant.description,
  address: mapAddressFromGQL(restaurant.address),
  cuisines: mapCuisineListFromGQL(configuration, restaurant.cuisines),
});

export const mapRestaurantsFromGQL = (
  restaurants: GQLRestaurant[],
  configuration: ApiConfiguration,
): Restaurant[] =>
  restaurants.map((restaurant) => mapRestaurantFromGQL(configuration, restaurant));

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

export const mapCourierFromGQL = (
  configuration: ApiConfiguration,
  courier: GQLCourier,
): Courier => ({
  id: courier.id,
  user: mapUserFromGQL(configuration, courier.user),
});

export const mapOrderFromGQL = (
  configuration: ApiConfiguration,
  order: GQLOrder,
): Order => ({
  id: order.id,
  client: mapUserFromGQL(configuration, order.client),
  restaurant: mapRestaurantFromGQL(configuration, order.restaurant),
  bag: order.bag ? mapBagFromGQL(order.bag) : undefined,
  bagId: order.bagId,
  set: mapSetFromGQL(configuration, order.set),
  setId: order.setId,
  number: order.number,
  orderInfo: mapOrderInfoFromGQL(order.orderInfo),
  created: order.created,
  placement: order.placement,
  state: mapOrderStateFromGQL(order.state),
  courierId: order.courierId ? order.courierId : undefined,
  courier: order.courier ? mapCourierFromGQL(configuration, order.courier) : undefined,
  rating: order.rating ? order.rating : undefined,
  cart: mapCartFromGQL(order.cart),
  date: order.date,
});

export const mapOrdersFromGQL = (
  configuration: ApiConfiguration,
  orders: GQLOrder[],
): Order[] => orders.map((order) => mapOrderFromGQL(configuration, order));

export const mapSelectedSetInfoFromGQL = (
  configuration: ApiConfiguration,
  selectedSetInfo: GQLSelectedSetInfo,
): SelectedSetInfo => ({
  set: mapSetFromGQL(configuration, selectedSetInfo.set),
  quantity: selectedSetInfo.quantity,
  numberOfDays: selectedSetInfo.numberOfDays,
});

export const mapSelectedSetsInfoFromGQL = (
  configuration: ApiConfiguration,
  sets: GQLSelectedSetInfo[],
): SelectedSetInfo[] => sets.map((set) => mapSelectedSetInfoFromGQL(configuration, set));

export const mapCreateCartRequestToGQL = (
  configuration: ApiConfiguration,
  request: CreateCartRequest,
): MutationCreateCartArgs => ({
  clientAddress: request.clientAddress,
  selectedSetsInfo: mapSelectedSetsInfoFromGQL(configuration, request.selectedSetsInfo),
});

export const mapEmailForSpamRequestToGQL = (request: EmailForSpam): EmailForSpam => ({
  email: request.email,
  isDiscount: request.isDiscount,
});

export const mapPreferencesFromGQL = (preferences: GQLPreferences): Preferences => ({
  id: preferences.id,
  allowPushNotifications: preferences.allowPushNotifications,
  allowEmailNotifications: preferences.allowEmailNotifications,
  allowSmsNotifications: preferences.allowSmsNotifications,
});

export const mapLatLngFromGQL = (latLng: GQLLatLng): LatLng => ({
  lat: latLng.lat,
  lng: latLng.lng,
});

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

export const groupDocumentFromGQL = (
  configuration: ApiConfiguration,
  documents: GQLDocument[],
): DocumentsGroups => {
  const groupSelector = ({group}: GQLDocument) => group;
  const groups = R.groupBy(groupSelector)(documents);
  return {
    employmentAgreement: groups[GQLDocumentGroup.EmploymentAgreement]
      ? mapDocumentsFromGQL(configuration, groups[GQLDocumentGroup.EmploymentAgreement])
      : [],
    driversLicense: groups[GQLDocumentGroup.DriversLicense]
      ? mapDocumentsFromGQL(configuration, groups[GQLDocumentGroup.DriversLicense])
      : [],
  };
};

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

export const mapDocumentsRevisionFromGQL = (
  revision: GQLDocumentsRevision,
): DocumentsRevision => {
  return {
    id: revision.id,
    status: mapDocumentsRevisionStatusFromGQL(revision.status),
    comment: revision.comment,
  };
};

export const mapDocumentGroupToGQL = (
  documentGroup: DocumentsGroup,
): GQLDocumentGroup => {
  switch (documentGroup) {
    case 'employmentAgreement':
      return GQLDocumentGroup.EmploymentAgreement;
    case 'driversLicense':
      return GQLDocumentGroup.DriversLicense;
  }
};
