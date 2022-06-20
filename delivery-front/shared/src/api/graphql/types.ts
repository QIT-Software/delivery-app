export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  DateTime: any;
};

export type LatLng = {
  __typename?: 'LatLng';
  lat: Scalars['Float'];
  lng: Scalars['Float'];
};

export type LatLngInput = {
  lat: Scalars['Float'];
  lng: Scalars['Float'];
};

export type Category = {
  __typename?: 'Category';
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type MutationMarkOrderArgs = {
  bagId: Scalars['String'];
  orderId: Scalars['String'];
};

export type Account = {
  __typename?: 'Account';
  user: User;
  info: AdditionalUserInfo;
  preferences: Preferences;
};

export type MutationUpdatePreferencesArgs = {
  allowPushNotifications?: Maybe<Scalars['Boolean']>;
  allowEmailNotifications?: Maybe<Scalars['Boolean']>;
  allowSmsNotifications?: Maybe<Scalars['Boolean']>;
};

export type Preferences = {
  __typename?: 'Preferences';
  id: Scalars['String'];
  allowPushNotifications: Scalars['Boolean'];
  allowEmailNotifications: Scalars['Boolean'];
  allowSmsNotifications: Scalars['Boolean'];
};

export type QueryBagByCodeArgs = {
  code: Scalars['String'];
};

export type QueryBagByOrderIdArgs = {
  id: Scalars['String'];
};

export type Ingredient = {
  __typename?: 'Ingredient';
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type Status = {
  __typename?: 'Status';
  id: Scalars['ID'];
  name: Scalars['String'];
  imageId: Scalars['String'];
};

export type Dish = {
  __typename?: 'Dish';
  id: Scalars['ID'];
  name: Scalars['String'];
  description: Scalars['String'];
  imageId: Scalars['String'];
  weight: Scalars['String'];
  kal: Scalars['String'];
  ingredients: Array<Ingredient>;
};

export type Cuisine = {
  __typename?: 'Cuisine';
  id: Scalars['ID'];
  imageId: Scalars['String'];
  nationality: Scalars['String'];
  rating: Scalars['String'];
};

export type Set = {
  __typename?: 'Set';
  id: Scalars['ID'];
  name: Scalars['String'];
  imageId: Scalars['String'];
  cuisineId: Scalars['String'];
  priceCents: Scalars['Int'];
  dishes: Array<Dish>;
  statuses: Array<Status>;
  day: Scalars['String'];
  isFavorite: Scalars['Boolean'];
};

export type UserUpdateRequest = {
  phoneNumber: Scalars['String'];
  email: Scalars['String'];
  name: Scalars['String'];
  // id: Scalars['ID'];
};

export type QueryCuisineByIdArgs = {
  id: Scalars['String'];
};

export type QueryCuisinesByRestaurantIdArgs = {
  id: Scalars['String'];
};

export type QuerySetByIdArgs = {
  id: Scalars['String'];
};

export type QueryDishByIdArgs = {
  id: Scalars['String'];
};

export type QueryDishesBySetIdArgs = {
  id: Scalars['String'];
};

export type QueryIngredientByIdArgs = {
  id: Scalars['String'];
};

export type QueryIngredientsByDishIdArgs = {
  id: Scalars['String'];
};

export type QuerySetsByCuisineIdArgs = {
  id: Scalars['String'];
};

export type QueryOrdersByCartIdArgs = {
  id: Scalars['String'];
};

export type QueryOrdersByRestaurantIdArgs = {
  id: Scalars['String'];
};

export type AdditionalUserInfo = {
  __typename?: 'AdditionalUserInfo';
  phoneNumber: Scalars['String'];
  email: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  name: Scalars['String'];
  image: Scalars['String'];
  additionalUserInfo?: Maybe<AdditionalUserInfo>;
};

export type Restaurant = {
  __typename?: 'Restaurant';
  id: Scalars['ID'];
  userId: Scalars['String'];
  imageId: Scalars['String'];
  description: Scalars['String'];
  address: Address;
  cuisines: Array<Cuisine>;
};

export type Bag = {
  __typename?: 'Bag';
  id: Scalars['ID'];
  code: Scalars['String'];
};

export type Address = {
  __typename?: 'Address';
  id: Scalars['ID'];
  placeId?: Maybe<Scalars['String']>;
  lat: Scalars['Float'];
  lng: Scalars['Float'];
  description: Scalars['String'];
  entrance?: Maybe<Scalars['String']>;
  floor?: Maybe<Scalars['String']>;
  apartment?: Maybe<Scalars['String']>;
};

export type EmailForSpam = {
  __typename?: 'EmailForSpam';
  id: Scalars['ID'];
  email: Scalars['String'];
  isDiscount: Scalars['Boolean'];
};

export type OrderInfo = {
  __typename?: 'OrderInfo';
  id: Scalars['String'];
  weight: Scalars['Float'];
  clientAddress: Address;
  distanceMiles: Scalars['Float'];
  priceCents: Scalars['Int'];
};

export enum OrderPlacement {
  Client = 'Client',
  Restaurant = 'Restaurant',
}

export enum OrderState {
  WaitingForPayment = 'WaitingForPayment',
  ReadyForDelivery = 'ReadyForDelivery',
  AcceptedByCourier = 'AcceptedByCourier',
  Delivering = 'Delivering',
  Delivered = 'Delivered',
  Completed = 'Completed',
}

export enum CartState {
  Active = 'Active',
  Delivered = 'Delivered',
}

export type Courier = {
  __typename?: 'Courier';
  id: Scalars['String'];
  user: User;
};

export type Cart = {
  __typename?: 'Cart';
  id: Scalars['String'];
  userId: Scalars['String'];
  status: CartState;
};

export type Order = {
  __typename?: 'Order';
  id: Scalars['String'];
  client: User;
  clientId: Scalars['String'];
  restaurant: Restaurant;
  bag: Maybe<Bag>;
  bagId: Scalars['String'];
  set: Set;
  setId: Scalars['String'];
  number: Scalars['Float'];
  orderInfo: OrderInfo;
  created: Scalars['DateTime'];
  placement: OrderPlacement;
  state: OrderState;
  courierId?: Maybe<Scalars['String']>;
  courier?: Maybe<Courier>;
  rating?: Maybe<Scalars['String']>;
  cart: Cart;
  date: Scalars['DateTime'];
};

export type QueryOrderByIdArgs = {
  id: Scalars['ID'];
};

export type CreateAddressRequest = {
  placeId?: Maybe<Scalars['String']>;
  lat?: Maybe<Scalars['Float']>;
  lng?: Maybe<Scalars['Float']>;
  description?: Maybe<Scalars['String']>;
  entrance?: Maybe<Scalars['String']>;
  floor?: Maybe<Scalars['String']>;
  apartment?: Maybe<Scalars['String']>;
};


export type MutationCreateEmailForSpamArgs = {
   email: MutationCreateEmailForSpamArgs;
}

export type CreateEmailForSpamRequest = {
  email: Scalars['String'];
  isDiscount: Scalars['Boolean'];
};

export type QueryUserLocationArgs = {
  id: Scalars['String'];
};

export type MutationUpdateLocationArgs = {
  latLng: LatLngInput;
};

export type SelectedSetInfo = {
  set: Set;
  quantity: Scalars['Int'];
  numberOfDays: Scalars['Int'];
};

export type MutationCreateCartArgs = {
  clientAddress: CreateAddressRequest;
  selectedSetsInfo: Array<SelectedSetInfo>;
};

export type MutationAcceptOrderArgs = {
  id: Scalars['String'];
};

export type QueryDistanceToRestaurantArgs = {
  lat: Scalars['Float'];
  lng: Scalars['Float'];
  restaurantId: Scalars['String'];
};

export enum DocumentsRevisionStatus {
  New = 'New',
  VerificationRequested = 'VerificationRequested',
  ChangesRequested = 'ChangesRequested',
  Approved = 'Approved',
  Rejected = 'Rejected',
}

export type DocumentsRevision = {
  __typename?: 'DocumentsRevision';
  id: Scalars['String'];
  comment: Scalars['String'];
  status: DocumentsRevisionStatus;
};

export type Document = {
  __typename?: 'Document';
  id: Scalars['ID'];
  group: DocumentGroup;
  fileId: Scalars['String'];
};

export enum DocumentGroup {
  EmploymentAgreement = 'EmploymentAgreement',
  DriversLicense = 'DriversLicense',
}

export type MutationAddDocumentArgs = {
  group: DocumentGroup;
  fileId: Scalars['ID'];
};

export type MutationDeleteDocumentArgs = {
  documentId: Scalars['ID'];
};

export type MutationRequestDocumentsRevisionVerificationArgs = {
  revisionId: Scalars['ID'];
};

export type QueryDocumentsArgs = {
  revisionId: Scalars['ID'];
};
