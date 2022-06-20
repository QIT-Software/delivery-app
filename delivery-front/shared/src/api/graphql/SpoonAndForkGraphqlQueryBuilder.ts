import {
  createMutationWithVariables,
  createQuery,
  createQueryWithVariables,
  // createMutationWithVariables,
} from '@spryrocks/react-api/graphql/Query';
import {gql} from 'apollo-boost';
import {
  Cuisine,
  QueryCuisineByIdArgs,
  QuerySetByIdArgs,
  QueryDishByIdArgs,
  QueryIngredientByIdArgs,
  Set,
  Dish,
  Bag,
  Ingredient,
  Order,
  QuerySetsByCuisineIdArgs,
  QueryIngredientsByDishIdArgs,
  QueryCuisinesByRestaurantIdArgs,
  QueryDishesBySetIdArgs,
  QueryOrderByIdArgs,
  MutationCreateCartArgs,
  QueryDistanceToRestaurantArgs,
  Account,
  QueryBagByCodeArgs,
  MutationMarkOrderArgs,
  OrderState,
  QueryBagByOrderIdArgs,
  CreateAddressRequest,
  MutationUpdatePreferencesArgs,
  Preferences,
  Cart,
  QueryOrdersByCartIdArgs,
  MutationAcceptOrderArgs,
  LatLng,
  QueryUserLocationArgs,
  MutationUpdateLocationArgs,
  DocumentsRevision,
  MutationAddDocumentArgs,
  MutationDeleteDocumentArgs,
  MutationRequestDocumentsRevisionVerificationArgs,
  QueryDocumentsArgs,
  Address,
  UserUpdateRequest,
  Restaurant,
  Document,
  CreateEmailForSpamRequest,
} from './types';
import UpdatePreferences from 'api/entities/UpdatePreferences';

const IngredientFragment = () => gql`
  fragment Ingredient on Ingredient {
    id
    name
  }
`;

const StatusFragment = () => gql`
  fragment Status on Status {
    id
    name
    imageId
  }
`;

const CartFragment = () => gql`
  fragment Cart on Cart {
    id
    userId
    status
  }
`;

const DishFragment = () => gql`
  ${IngredientFragment()}
  fragment Dish on Dish {
    id
    name
    description
    imageId
    weight
    kal
    ingredients {
      ...Ingredient
    }
  }
`;

const SetFragment = () => gql`
  ${StatusFragment()}
  ${DishFragment()}
  fragment Set on Set {
    id
    name
    imageId
    cuisineId
    priceCents
    statuses {
      ...Status
    }
    dishes {
      ...Dish
    }
    day
    isFavorite
  }
`;

const CuisineFragment = () => gql`
  fragment Cuisine on Cuisine {
    id
    imageId
    nationality
    rating
  }
`;

const UserFragment = () => gql`
  fragment User on User {
    id
    name
    image
    additionalUserInfo {
      email
      phoneNumber
    }
  }
`;

const CourierFragment = () => gql`
  fragment Courier on Courier {
    id
    user {
      ...User
    }
  }
`;

export const myAccountQuery = createQuery<{myAccount: Account}, Account>(
  gql`
    ${UserFragment()}
    query myAccount {
      myAccount {
        user {
          ...User
        }
        info {
          phoneNumber
          email
        }
      }
    }
  `,
  ({myAccount}) => myAccount,
);

// const LatLngFragment = () => gql`
//   fragment LatLng on LatLng {
//     lat
//     lng
//   }
// `;

const AddressFragment = () => gql`
  fragment Address on Address {
    id
    placeId
    description
    entrance
    floor
    apartment
    lat
    lng
  }
`;

const RestaurantFragment = () => gql`
  ${AddressFragment()}
  ${CuisineFragment()}
  ${UserFragment()}
  fragment Restaurant on Restaurant {
    id
    user {
      ...User
    }
    imageId
    description
    address {
      ...Address
    }
    cuisines {
      ...Cuisine
    }
  }
`;

const DocumentFragment = () => gql`
  fragment Document on Document {
    id
    group
    fileId
  }
`;
// const CourierFragment = () => gql`
//   fragment Courier on Courier {
//     id
//     user {
//       ...User
//     }
//   }
// `;

export const bagByCodeQuery = createQueryWithVariables<
  QueryBagByCodeArgs,
  {bagByCode: Bag},
  Bag
>(
  gql`
    query bagByCode($code: String!) {
      bagByCode(code: $code) {
        id
        code
      }
    }
  `,
  ({bagByCode}) => bagByCode,
);

export const bagByOrderIdQuery = createQueryWithVariables<
  QueryBagByOrderIdArgs,
  {bagByOrderId: Bag},
  Bag
>(
  gql`
    query bagByOrderId($id: String!) {
      bagByOrderId(id: $id) {
        id
        code
      }
    }
  `,
  ({bagByOrderId}) => bagByOrderId,
);

export const acceptOrderMutation = createMutationWithVariables<
  MutationAcceptOrderArgs,
  {acceptOrder: OrderState},
  OrderState
>(
  gql`
    mutation acceptOrder($id: String!) {
      acceptOrder(id: $id)
    }
  `,
  ({acceptOrder}) => acceptOrder,
);

export const mutationMarkOrder = createMutationWithVariables<
  MutationMarkOrderArgs,
  {markOrder: OrderState},
  OrderState
>(
  gql`
    mutation markOrder($orderId: String!, $bagId: String!) {
      markOrder(orderId: $orderId, bagId: $bagId)
    }
  `,
  ({markOrder}) => markOrder,
);

const PreferencesFragment = () => gql`
  fragment Preferences on Preferences {
    id
    allowPushNotifications
    allowEmailNotifications
    allowSmsNotifications
  }
`;

export const preferencesQuery = createQuery<{preferences: Preferences}, Preferences>(
  gql`
    ${PreferencesFragment()}
    query preferences {
      preferences {
        ...Preferences
      }
    }
  `,
  ({preferences}) => preferences,
);

export const mutationUpdatePreferences = createMutationWithVariables<
  MutationUpdatePreferencesArgs,
  UpdatePreferences,
  UpdatePreferences
>(
  gql`
    ${PreferencesFragment()}
    mutation updatePreferences(
      $allowPushNotifications: Boolean
      $allowEmailNotifications: Boolean
      $allowSmsNotifications: Boolean
    ) {
      updatePreferences(
        allowPushNotifications: $allowPushNotifications
        allowEmailNotifications: $allowEmailNotifications
        allowSmsNotifications: $allowSmsNotifications
      ) {
        ...Preferences
      }
    }
  `,
  (updatePreferences) => updatePreferences,
);

export const OrderFragment = () => gql`
  ${SetFragment()}
  ${UserFragment()}
  ${CourierFragment()}
  ${AddressFragment()}
  ${RestaurantFragment()}
  ${CartFragment()}
  fragment Order on Order {
    id
    bag {
      id
      code
    }
    set {
      ...Set
    }
    client {
      ...User
    }
    orderInfo {
      id
      priceCents
      distanceMiles
      clientAddress {
        ...Address
      }
    }
    restaurant {
      ...Restaurant
    }
    number
    created
    placement
    state
    courier {
      ...Courier
    }
    cart {
      ...Cart
    }
    rating
    date
  }
`;

export const cuisineListQuery = createQuery<{cuisines: [Cuisine]}, [Cuisine]>(
  gql`
    ${CuisineFragment()}
    query cuisines {
      cuisines {
        ...Cuisine
      }
    }
  `,
  ({cuisines}) => cuisines,
);

export const cuisineByIdQuery = createQueryWithVariables<
  QueryCuisineByIdArgs,
  {cuisineById: Cuisine},
  Cuisine
>(
  gql`
    ${CuisineFragment()}
    query cuisineById($id: String!) {
      cuisineById(id: $id) {
        ...Cuisine
      }
    }
  `,
  ({cuisineById}) => cuisineById,
);

export const cuisinesByRestaurantIdQuery = createQueryWithVariables<
  QueryCuisinesByRestaurantIdArgs,
  {cuisinesByRestaurantId: Cuisine[]},
  Cuisine[]
>(
  gql`
    ${CuisineFragment()}
    query cuisinesByRestaurantId($id: String!) {
      cuisinesByRestaurantId(id: $id) {
        ...Cuisine
      }
    }
  `,
  ({cuisinesByRestaurantId}) => cuisinesByRestaurantId,
);

export const setByIdQuery = createQueryWithVariables<
  QuerySetByIdArgs,
  {setById: Set},
  Set
>(
  gql`
    ${SetFragment()}
    query setById($id: String!) {
      setById(id: $id) {
        ...Set
      }
    }
  `,
  ({setById}) => setById,
);

export const setsByCuisineIdQuery = createQueryWithVariables<
  QuerySetsByCuisineIdArgs,
  {setsByCuisineId: Set[]},
  Set[]
>(
  gql`
    ${SetFragment()}
    query setsByCuisineId($id: String!) {
      setsByCuisineId(id: $id) {
        ...Set
      }
    }
  `,
  ({setsByCuisineId}) => setsByCuisineId,
);

export const dishByIdQuery = createQueryWithVariables<
  QueryDishByIdArgs,
  {dishById: Dish},
  Dish
>(
  gql`
    ${DishFragment()}
    query dishById($id: String!) {
      dishById(id: $id) {
        ...Dish
      }
    }
  `,
  ({dishById}) => dishById,
);

export const dishesBySetIdQuery = createQueryWithVariables<
  QueryDishesBySetIdArgs,
  {dishesBySetId: Dish[]},
  Dish[]
>(
  gql`
    ${DishFragment()}
    query dishesBySetId($id: String!) {
      dishesBySetId(id: $id) {
        ...Dish
      }
    }
  `,
  ({dishesBySetId}) => dishesBySetId,
);

export const ordersByCartIdQuery = createQueryWithVariables<
  QueryOrdersByCartIdArgs,
  {ordersByCartId: Order[]},
  Order[]
>(
  gql`
    ${OrderFragment()}
    query ordersByCartId($id: String!) {
      ordersByCartId(id: $id) {
        ...Order
      }
    }
  `,
  ({ordersByCartId}) => ordersByCartId,
);

export const ordersByRestaurantIdQuery = createQuery<
  {ordersByRestaurantId: Order[]},
  Order[]
>(
  gql`
    ${OrderFragment()}
    query {
      ordersByRestaurantId {
        ...Order
      }
    }
  `,
  ({ordersByRestaurantId}) => ordersByRestaurantId,
);

export const ordersByUserIdQuery = createQuery<{ordersByUserId: Order[]}, Order[]>(
  gql`
    ${OrderFragment()}
    query {
      ordersByUserId {
        ...Order
      }
    }
  `,
  ({ordersByUserId}) => ordersByUserId,
);

export const ordersByCourierIdQuery = createQuery<{ordersByCourierId: Order[]}, Order[]>(
  gql`
    ${OrderFragment()}
    query {
      ordersByCourierId {
        ...Order
      }
    }
  `,
  ({ordersByCourierId}) => ordersByCourierId,
);

export const clientOrdersAddressesQuery = createQuery<
  {clientOrdersAddresses: Address[]},
  Address[]
>(
  gql`
    ${AddressFragment()}
    query {
      clientOrdersAddresses {
        ...Address
      }
    }
  `,
  ({clientOrdersAddresses}) => clientOrdersAddresses,
);

export const userCartsQuery = createQuery<{cartsByUserId: Cart[]}, Cart[]>(
  gql`
    ${CartFragment()}
    query {
      cartsByUserId {
        ...Cart
      }
    }
  `,
  ({cartsByUserId}) => cartsByUserId,
);

export const restaurantQuery = createQuery<{currentRestaurant: Restaurant}, Restaurant>(
  gql`
    ${RestaurantFragment()}
    query {
      currentRestaurant {
        ...Restaurant
      }
    }
  `,
  ({currentRestaurant}) => currentRestaurant,
);

export const setsQuery = createQuery<{sets: Set[]}, Set[]>(
  gql`
    ${SetFragment()}
    query {
      sets {
        ...Set
      }
    }
  `,
  ({sets}) => sets,
);

export const ingredientByIdQuery = createQueryWithVariables<
  QueryIngredientByIdArgs,
  {ingredientById: Ingredient},
  Ingredient
>(
  gql`
    ${IngredientFragment()}
    query ingredientById($id: String!) {
      ingredientById(id: $id) {
        ...Ingredient
      }
    }
  `,
  ({ingredientById}) => ingredientById,
);

export const ingredientsByDishIdQuery = createQueryWithVariables<
  QueryIngredientsByDishIdArgs,
  {ingredientsByDishId: Ingredient[]},
  Ingredient[]
>(
  gql`
    ${IngredientFragment()}
    query ingredientsByDishId($id: String!) {
      ingredientsByDishId(id: $id) {
        ...Ingredient
      }
    }
  `,
  ({ingredientsByDishId}) => ingredientsByDishId,
);

export const ordersForDeliveryQuery = createQuery<{ordersForDelivery: Order[]}, Order[]>(
  gql`
    ${OrderFragment()}
    query {
      ordersForDelivery {
        ...Order
      }
    }
  `,
  ({ordersForDelivery}) => ordersForDelivery,
);

export const orderByIdQuery = createQueryWithVariables<
  QueryOrderByIdArgs,
  {orderById: Order},
  Order
>(
  gql`
    ${OrderFragment()}
    query orderById($id: ID!) {
      orderById(id: $id) {
        ...Order
      }
    }
  `,
  ({orderById}) => orderById,
);

export const mutationSaveNewCart = createMutationWithVariables<
  MutationCreateCartArgs,
  {createCartAndDistributeOrders: Cart},
  Cart
>(
  gql`
    ${CartFragment()}
    mutation createCartAndDistributeOrders(
      $clientAddress: CreateAddressRequest!
      $selectedSetsInfo: [SelectedSetInfo!]!
    ) {
      createCartAndDistributeOrders(
        clientAddress: $clientAddress
        selectedSetsInfo: $selectedSetsInfo
      ) {
        ...Cart
      }
    }
  `,
  ({createCartAndDistributeOrders}) => createCartAndDistributeOrders,
);

export const queryDistanceToRestaurant = createQueryWithVariables<
  QueryDistanceToRestaurantArgs,
  {distanceToRestaurant: number},
  number
>(
  gql`
    query distanceToRestaurant($restaurantId: String!, $lat: Float!, $lng: Float!) {
      distanceToRestaurant(restaurantId: $restaurantId, lat: $lat, lng: $lng)
    }
  `,
  ({distanceToRestaurant}) => distanceToRestaurant,
);

export const mutationUserProfile = createMutationWithVariables<
  {
    updateRequest: UserUpdateRequest;
  },
  {updateMyAccount: Account},
  Account
>(
  gql`
    mutation updateMyAccount($updateRequest: UserUpdateRequest!) {
      updateMyAccount(user: $updateRequest) {
        user {
          name
        }
        info {
          phoneNumber
          email
        }
      }
    }
  `,
  ({updateMyAccount}) => updateMyAccount,
);

export const mutationCreateAddress = createMutationWithVariables<
  CreateAddressRequest,
  {createAddress: Boolean},
  void
>(
  gql`
    mutation createAddress($location: CreateAddressRequest!) {
      createAddress(location: $location)
    }
  `,
  ({createAddress}) => createAddress,
);

export const mutationCreateEmailForSpam = createMutationWithVariables<
  CreateEmailForSpamRequest,
  {createEmailForSpam: Boolean},
  void
>(
  gql`
    mutation createEmailForSpam($email: CreateEmailForSpamRequest!) {
      createEmailForSpam(email: $email)
    }
  `,
  ({createEmailForSpam}) => createEmailForSpam,
);

export const mutationUpdateUserLocation = createMutationWithVariables<
  MutationUpdateLocationArgs,
  {updateLocation: boolean},
  void
>(
  gql`
    mutation updateLocation($latLng: LatLngInput!) {
      updateLocation(latLng: $latLng)
    }
  `,
  ({updateLocation}) => updateLocation,
);

export const queryUserLocation = createQueryWithVariables<
  QueryUserLocationArgs,
  {userLocation: LatLng | undefined},
  LatLng | undefined
>(
  gql`
    query userLocation($id: String!) {
      userLocation(id: $id) {
        lat
        lng
      }
    }
  `,
  ({userLocation}) => userLocation,
);

export const queryGetCurrentRevision = createQuery<
  {currentRevision: DocumentsRevision},
  DocumentsRevision
>(
  gql`
    query {
      currentRevision {
        id
        status
        comment
      }
    }
  `,
  ({currentRevision}) => currentRevision,
);

export const mutationAddDocument = createMutationWithVariables<
  MutationAddDocumentArgs,
  {addDocument: Document},
  Document
>(
  gql`
    mutation addDocument($fileId: ID!, $group: DocumentGroup!) {
      addDocument(fileId: $fileId, group: $group) {
        fileId
        group
      }
    }
  `,
  ({addDocument}) => addDocument,
);

export const mutationDeleteDocument = createMutationWithVariables<
  MutationDeleteDocumentArgs,
  {deleteDocument: Document},
  Document
>(
  gql`
    mutation deleteDocument($documentId: ID!) {
      deleteDocument(documentId: $documentId)
    }
  `,
  ({deleteDocument}) => deleteDocument,
);

export const requestDocumentsRevisionVerificationMutation = createMutationWithVariables<
  MutationRequestDocumentsRevisionVerificationArgs,
  {updateRevisionStatus: boolean},
  void
>(
  gql`
    mutation($revisionId: ID!) {
      requestDocumentsRevisionVerification(revisionId: $revisionId)
    }
  `,
  () => undefined,
);

export const documentsQuery = createQueryWithVariables<
  QueryDocumentsArgs,
  {documents: Document[]},
  Document[]
>(
  gql`
    ${DocumentFragment()}
    query($revisionId: ID!) {
      documents(revisionId: $revisionId) {
        ...Document
      }
    }
  `,
  ({documents}) => documents,
);

export const mutationUpdateMyAccountImage = createMutationWithVariables<
  {
    image: String;
  },
  unknown,
  undefined
>(
  gql`
    mutation updateMyAccountImage($image: String!) {
      updateMyAccountImage(image: $image)
    }
  `,
  (_) => undefined,
);
