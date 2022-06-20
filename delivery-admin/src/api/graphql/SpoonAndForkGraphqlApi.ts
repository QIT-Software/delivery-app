import GraphqlApiBase from '@spryrocks/react-api/graphql/ApiBase';
import {
  clientByIdQuery,
  clientsQuery,
  courierByIdQuery,
  couriersQuery,
  cuisineByIdQuery,
  cuisinesQuery,
  deleteCuisineMutation,
  deleteDishMutation,
  deleteOrderMutation,
  deleteRestaurantMutation,
  deleteSetMutation,
  deleteStatusMutation,
  dishByIdQuery,
  dishesQuery,
  documentsQuery,
  evaluateDocumentsRevisionMutation,
  mutationCreateCuisine,
  mutationCreateDish,
  mutationCreateRestaurant,
  mutationCreateSet,
  mutationCreateStatus,
  mutationDistributeSetsByDays,
  mutationUpdateClientInformation,
  mutationUpdateCourierInformation,
  mutationUpdateCuisine,
  mutationUpdateDish,
  mutationUpdateMyAccountImage,
  mutationUpdateRestaurant,
  mutationUpdateSet,
  mutationUpdateStatus,
  myAccountQuery,
  orderByIdQuery,
  ordersQuery,
  removeTheCurrentCourierMutation,
  restaurantByIdQuery,
  restaurantsQuery,
  setByIdQuery,
  setsByCuisineIdQuery,
  setsByDishIdQuery,
  setsQuery,
  statusByIdQuery,
  statusesQuery,
} from './SpoonAndForkGraphqlQueryBuilder';
import {ID} from 'entities/Common';
import {
  EvaluateDocumentsRevisionType,
  MutationCreateCuisineArgs,
  MutationCreateDishArgs,
  MutationCreateRestaurantArgs,
  MutationCreateSetArgs,
  MutationCreateStatusArgs,
  MutationDistributeSetsByDaysArgs,
  MutationUpdateClientInformationArgs,
  MutationUpdateCourierInformationArgs,
  MutationUpdateCuisineArgs,
  MutationUpdateDishArgs,
  MutationUpdateRestaurantArgs,
  MutationUpdateSetArgs,
  MutationUpdateStatusArgs,
} from 'api/graphql/types';

export default class SpoonAndForkGraphqlApi extends GraphqlApiBase {
  public async queryMyAccount() {
    return this.query(myAccountQuery());
  }

  public mutationUpdateMyAccountImage(image: string) {
    return this.mutation(
      mutationUpdateMyAccountImage({
        image,
      }),
    );
  }

  public mutationUpdateCuisine(request: MutationUpdateCuisineArgs) {
    return this.mutation(mutationUpdateCuisine(request));
  }

  public mutationCreateCuisine(request: MutationCreateCuisineArgs) {
    return this.mutation(mutationCreateCuisine(request));
  }

  public mutationUpdateDish(request: MutationUpdateDishArgs) {
    return this.mutation(mutationUpdateDish(request));
  }

  public mutationCreateDish(request: MutationCreateDishArgs) {
    return this.mutation(mutationCreateDish(request));
  }

  public mutationUpdateSet(request: MutationUpdateSetArgs) {
    return this.mutation(mutationUpdateSet(request));
  }

  public mutationCreateSet(request: MutationCreateSetArgs) {
    return this.mutation(mutationCreateSet(request));
  }

  public mutationDistributeSetsByDays(request: MutationDistributeSetsByDaysArgs) {
    return this.mutation(mutationDistributeSetsByDays(request));
  }

  public mutationUpdateClientInformation(request: MutationUpdateClientInformationArgs) {
    return this.mutation(mutationUpdateClientInformation(request));
  }

  public mutationUpdateCourierInformation(request: MutationUpdateCourierInformationArgs) {
    return this.mutation(mutationUpdateCourierInformation(request));
  }

  public async queryOrders() {
    return this.query(ordersQuery());
  }

  public async queryOrderById(id: ID) {
    return this.query(orderByIdQuery({id}));
  }

  public async queryClients() {
    return this.query(clientsQuery());
  }

  public async queryClientById(clientId: ID) {
    return this.query(clientByIdQuery({clientId}));
  }

  public async queryCouriers() {
    return this.query(couriersQuery());
  }

  public async queryCourierById(courierId: ID) {
    return this.query(courierByIdQuery({courierId}));
  }

  public async queryRestaurants() {
    return this.query(restaurantsQuery());
  }

  public async queryRestaurantById(restaurantId: ID) {
    return this.query(restaurantByIdQuery({restaurantId}));
  }

  public mutationCreateRestaurant(request: MutationCreateRestaurantArgs) {
    return this.mutation(mutationCreateRestaurant(request));
  }

  public mutationUpdateRestaurant(request: MutationUpdateRestaurantArgs) {
    return this.mutation(mutationUpdateRestaurant(request));
  }

  public async queryCuisines() {
    return this.query(cuisinesQuery());
  }

  public async queryCuisineById(id: string) {
    return this.query(cuisineByIdQuery({id}));
  }

  public async queryDishes() {
    return this.query(dishesQuery());
  }

  public async queryDishById(id: string) {
    return this.query(dishByIdQuery({id}));
  }

  public async querySets() {
    return this.query(setsQuery());
  }

  public async querySetById(id: string) {
    return this.query(setByIdQuery({id}));
  }

  public async querySetsByDishId(id: string) {
    return this.query(setsByDishIdQuery({id}));
  }

  public async querySetsByCuisineId(id: string) {
    return this.query(setsByCuisineIdQuery({id}));
  }

  public async queryDeleteOrder(orderId: string) {
    await this.mutation(deleteOrderMutation({orderId}));
  }

  public async queryDeleteRestaurant(restaurantId: string) {
    await this.mutation(deleteRestaurantMutation({restaurantId}));
  }

  public async queryDeleteCuisine(cuisineId: string) {
    await this.mutation(deleteCuisineMutation({cuisineId}));
  }

  public async queryDeleteDish(dishId: string) {
    await this.mutation(deleteDishMutation({dishId}));
  }

  public async queryDeleteSet(setId: string) {
    await this.mutation(deleteSetMutation({setId}));
  }

  public async queryDeleteStatus(statusId: string) {
    await this.mutation(deleteStatusMutation({statusId}));
  }

  public async removeTheCurrentCourier(orderId: string) {
    await this.mutation(removeTheCurrentCourierMutation({orderId}));
  }

  public async queryStatuses() {
    return this.query(statusesQuery());
  }

  public async queryStatusById(id: string) {
    return this.query(statusByIdQuery({id}));
  }

  public mutationUpdateStatus(request: MutationUpdateStatusArgs) {
    return this.mutation(mutationUpdateStatus(request));
  }

  public mutationCreateStatus(request: MutationCreateStatusArgs) {
    return this.mutation(mutationCreateStatus(request));
  }

  public async evaluateDocumentsRevision(
    courierId: ID,
    type: EvaluateDocumentsRevisionType,
    comment: string,
  ) {
    return this.mutation(evaluateDocumentsRevisionMutation({courierId, type, comment}));
  }

  public async queryDocuments(revisionId: ID) {
    return this.query(documentsQuery({revisionId}));
  }
}
