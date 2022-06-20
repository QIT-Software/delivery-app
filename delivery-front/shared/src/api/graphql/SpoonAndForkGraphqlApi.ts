import GraphqlApiBase from '@spryrocks/react-api/graphql/ApiBase';
import {
  cuisineListQuery,
  cuisineByIdQuery,
  cuisinesByRestaurantIdQuery,
  setByIdQuery,
  setsByCuisineIdQuery,
  dishByIdQuery,
  dishesBySetIdQuery,
  ingredientByIdQuery,
  ingredientsByDishIdQuery,
  ordersForDeliveryQuery,
  orderByIdQuery,
  ordersByUserIdQuery,
  ordersByCartIdQuery,
  mutationSaveNewCart,
  queryDistanceToRestaurant,
  preferencesQuery,
  mutationUpdatePreferences,
  myAccountQuery,
  bagByCodeQuery,
  bagByOrderIdQuery,
  mutationMarkOrder,
  mutationCreateAddress,
  acceptOrderMutation,
  ordersByCourierIdQuery,
  ordersByRestaurantIdQuery,
  queryUserLocation,
  mutationUpdateUserLocation,
  queryGetCurrentRevision,
  mutationAddDocument,
  mutationDeleteDocument,
  requestDocumentsRevisionVerificationMutation,
  documentsQuery,
  userCartsQuery,
  clientOrdersAddressesQuery,
  setsQuery,
  mutationUserProfile,
  mutationUpdateMyAccountImage,
  restaurantQuery,
  mutationCreateEmailForSpam,
} from './SpoonAndForkGraphqlQueryBuilder';
import {ID} from 'entities/Common';
import {
  CreateAddressRequest,
  DocumentGroup,
  LatLng,
  MutationCreateCartArgs,
} from 'api/graphql/types';
import Preferences from 'state/entities/Preferences';
import UpdatePreferences from 'api/entities/UpdatePreferences';
import UpdateUserRequest from 'state/ducks/session/models';
import {EmailForSpam} from 'state/entities/EmailForSpam';

export default class SpoonAndForkGraphqlApi extends GraphqlApiBase {
  public async queryCuisineList() {
    return this.query(cuisineListQuery());
  }

  public async queryMyAccount() {
    return this.query(myAccountQuery());
  }

  public async queryCuisineById(id: string) {
    return this.query(cuisineByIdQuery({id}));
  }

  public async queryCuisinesByRestaurantId(id: string) {
    return this.query(cuisinesByRestaurantIdQuery({id}));
  }

  public async querySetById(id: string) {
    return this.query(setByIdQuery({id}));
  }

  public async queryPreferences() {
    return this.query(preferencesQuery());
  }

  public async mutationPreferences(request: UpdatePreferences) {
    return this.mutation(mutationUpdatePreferences(request));
  }

  public async querySetsByCuisineId(id: string) {
    return this.query(setsByCuisineIdQuery({id}));
  }

  public async queryDishById(id: string) {
    return this.query(dishByIdQuery({id}));
  }

  public async queryDishesBySetId(id: string) {
    return this.query(dishesBySetIdQuery({id}));
  }

  public async queryOrdersByCartId(id: string) {
    return this.query(ordersByCartIdQuery({id}));
  }

  public async queryOrdersByRestaurantId() {
    return this.query(ordersByRestaurantIdQuery());
  }

  public async queryOrdersByUserId() {
    return this.query(ordersByUserIdQuery());
  }

  public async queryOrdersByCourierId() {
    return this.query(ordersByCourierIdQuery());
  }

  public async queryClientOrdersAddresses() {
    return this.query(clientOrdersAddressesQuery());
  }

  public async queryUserCarts() {
    return this.query(userCartsQuery());
  }

  public async querySets() {
    return this.query(setsQuery());
  }

  public async queryRestaurant() {
    return this.query(restaurantQuery());
  }

  public mutationUserProfilePreferences(preferences: Preferences) {
    return this.mutation(
      mutationUpdatePreferences({
        allowPushNotifications: preferences.allowPushNotifications,
      }),
    );
  }

  public async queryIngredientById(id: string) {
    return this.query(ingredientByIdQuery({id}));
  }

  public async queryIngredientsByDishId(id: string) {
    return this.query(ingredientsByDishIdQuery({id}));
  }

  queryBagByCode(code: string) {
    return this.query(bagByCodeQuery({code}));
  }

  public mutationUserProfile(updateRequest: UpdateUserRequest) {
    return this.mutation(mutationUserProfile({updateRequest}));
  }

  public async mutationCreateAddress(address: CreateAddressRequest) {
    return this.mutation(mutationCreateAddress(address));
  }

  public async mutationCreateEmailForSpam(email: EmailForSpam) {
    return this.mutation(
      mutationCreateEmailForSpam({email: email.email, isDiscount: email.isDiscount}),
    );
  }

  public async markOrderMutation(orderId: string, bag: string) {
    await this.mutation(mutationMarkOrder({orderId, bagId: bag}));
  }

  public async queryBagsByOrderId(id: string) {
    return this.query(bagByOrderIdQuery({id}));
  }

  public async acceptOrderMutation(id: string) {
    await this.mutation(acceptOrderMutation({id}));
  }

  public async queryOrdersForDelivery() {
    return this.query(ordersForDeliveryQuery());
  }

  public async queryOrderById(id: ID) {
    return this.query(orderByIdQuery({id}));
  }

  public async mutationSaveNewCart(request: MutationCreateCartArgs) {
    return this.mutation(mutationSaveNewCart(request));
  }

  public async queryDistanceToRestaurant(restaurantId: string, lat: number, lng: number) {
    return this.query(queryDistanceToRestaurant({restaurantId, lat, lng}));
  }

  public async mutationUpdateUserLocation(latLng: LatLng) {
    await this.mutation(mutationUpdateUserLocation({latLng}));
  }

  public async queryUserLocation(id: string) {
    return this.query(queryUserLocation({id}));
  }

  public async queryCurrentRevision() {
    return this.query(queryGetCurrentRevision());
  }

  public mutationAddDocument(fileId: string, group: DocumentGroup) {
    return this.mutation(mutationAddDocument({fileId, group}));
  }

  public async mutationDeleteDocument(documentId: string) {
    await this.mutation(mutationDeleteDocument({documentId}));
  }

  public async mutationRequestDocumentsRevisionVerification(revisionId: string) {
    await this.mutation(requestDocumentsRevisionVerificationMutation({revisionId}));
  }

  public async queryDocuments(revisionId: ID) {
    return this.query(documentsQuery({revisionId}));
  }

  public mutationUpdateMyAccountImage(image: string) {
    return this.mutation(
      mutationUpdateMyAccountImage({
        image,
      }),
    );
  }
}
