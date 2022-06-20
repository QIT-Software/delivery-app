import {ISpoonAndForkApi} from 'api/ISpoonAndForkApi';
import RegisterRequest from './entities/RegisterRequest';
import LoginRequest from './entities/LoginRequest';
import RestApi from 'api/rest/RestApi';
import ApiConfiguration from '@spryrocks/react-api/ApiConfiguration';
import SpoonAndForkGraphqlApi from 'api/graphql/SpoonAndForkGraphqlApi';
import {
  groupDocumentFromGQL,
  mapClientFromGQL,
  mapClientsFromGQL,
  mapCourierFromGQL,
  mapCouriersFromGQL,
  mapCuisineFromGQL,
  mapCuisinesFromGQL,
  mapDishFromGQL,
  mapDishesFromGQL,
  mapSetFromGQL,
  mapSetsFromGQL,
  mapMyAccountFromGQL,
  mapOrderFromGQL,
  mapOrdersFromGQL,
  mapRestaurantFromGQL,
  mapRestaurantsFromGQL,
  mapUpdateClientInformationRequestToGQL,
  mapUpdateCourierInformationRequestToGQL,
  mapStatusesFromGQL,
  mapStatusFromGQL,
} from 'api/Mappers';
// import {ApolloError} from 'apollo-boost';
// import * as R from 'ramda';
import ForgotPasswordRequest from 'api/entities/ForgotPasswordRequest';
// import Queue from 'promise-queue';
// import {AuthInfoKeeper} from 'auth';
// import {SpoonAndForkApiTokenHolders} from 'api/index';
import ApiDelegate, {AuthInfo} from '@spryrocks/react-api/ApiDelegate';
import ApiBase from '@spryrocks/react-api/ApiBase';
import IApiTokenHolder from '@spryrocks/react-api/IApiTokenHolder';
import {ID} from 'entities/Common';
import UpdateFirebaseTokenRequest from 'api/entities/UpdateFirebaseTokenRequest';
import UpdateCuisineRequest from 'api/entities/UpdateCuisineRequest';
import UpdateDishRequest from 'api/entities/UpdateDishRequest';
import UpdateUserInformationRequest from 'api/entities/UpdateUserInformationRequest';
import UpdateRestaurantInformationRequest from './entities/UpdateRestaurantInformationRequest';
import Cuisine from 'entities/Cuisine';
import Dish from 'entities/Dish';
import Set from 'entities/Set';
import CreateCuisineRequest from 'api/entities/CreateCuisineRequest';
import CreateDishRequest from 'api/entities/CreateDishRequest';
import UpdateSetRequest from 'api/entities/UpdateSetRequest';
import CreateSetRequest from 'api/entities/CreateSetRequest';
import UpdateStatusRequest from 'api/entities/UpdateStatusRequest';
import CreateStatusRequest from 'api/entities/CreateStatusRequest';
import Status from 'entities/Status';
import {EvaluateDocumentsRevisionType} from 'entities/Documents';
import DistributeSetsByDaysRequest from './entities/DistributeSetsByDaysRequest';
import CreateRestaurantInformationRequest from './entities/CreateRestaurantInformationRequest';

export default class SpoonAndForkApi extends ApiBase implements ISpoonAndForkApi {
  // private refreshQueue = new Queue(1, Infinity);

  private readonly restApi: RestApi;

  private readonly graphqlApi: SpoonAndForkGraphqlApi;

  constructor(
    configuration: ApiConfiguration,
    delegate: ApiDelegate,
    tokenHolder: IApiTokenHolder,
  ) {
    super(configuration, delegate, tokenHolder);

    if (!configuration.graphql) throw new Error('Please specify graphql configuration');
    this.graphqlApi = new SpoonAndForkGraphqlApi(
      this.baseUrl,
      this.wsBaseUrl,
      configuration.graphql,
      this.delegate,
    );

    if (!configuration.rest) throw new Error('Please specify rest configuration');
    this.restApi = new RestApi(this.baseUrl, configuration.rest, this.delegate);
  }

  public async register(request: RegisterRequest) {
    return this.restApi.register(request);
  }

  public async login(request: LoginRequest) {
    return this.restApi.login(request);
  }

  public async uploadFile(file: File) {
    return this.restApi.uploadFile(file);
  }

  public async myAccount() {
    return this.wrapApiCall(async () =>
      mapMyAccountFromGQL(await this.graphqlApi.queryMyAccount()),
    );
  }

  // public async wrapApiCall<TResponse>(
  //   call: () => Promise<TResponse>,
  // ): Promise<TResponse> {
  //   try {
  //     return await call();
  //   } catch (e) {
  //     if (SpoonAndForkApi.checkNotAuthorizedError(e)) {
  //       await this.refreshQueue.add(() => this.refreshTokens());
  //       // eslint-disable-next-line no-return-await
  //       return await call();
  //     }
  //     throw e;
  //   }
  // }
  //
  // private static checkNotAuthorizedError(e: ApolloError | ApiHttpError) {
  //   if (e instanceof ApiError) {
  //     return e.status === 401;
  //   }
  //   // @ts-ignore
  //   const gqlError = R.filter((e) => e.message.statusCode === 401, e.graphQLErrors);
  //   return !!gqlError;
  // }

  protected async refreshToken(refreshToken: string): Promise<AuthInfo> {
    const session = await this.restApi.refresh({refreshToken});
    return {accessToken: session.jwt, refreshToken: session.refreshToken};
  }

  public async forgotPassword(request: ForgotPasswordRequest) {
    return this.restApi.forgotPassword(request);
  }

  public async updateUserPassword(oldPassword: string, password: string) {
    return this.wrapApiCall(async () =>
      this.restApi.changePassword({oldPassword, password}),
    );
  }

  public async updateUserProfileImage(imageId: string): Promise<void> {
    return this.wrapApiCall(async () =>
      this.graphqlApi.mutationUpdateMyAccountImage(imageId),
    );
  }

  public async getOrders() {
    return this.wrapApiCall(async () =>
      mapOrdersFromGQL(this.configuration, await this.graphqlApi.queryOrders()),
    );
  }

  public async getOrderById(id: ID) {
    return this.wrapApiCall(async () =>
      mapOrderFromGQL(this.configuration, await this.graphqlApi.queryOrderById(id)),
    );
  }

  public async getClients() {
    return this.wrapApiCall(async () =>
      mapClientsFromGQL(this.configuration, await this.graphqlApi.queryClients()),
    );
  }

  public async getClientById(id: ID) {
    return this.wrapApiCall(async () =>
      mapClientFromGQL(this.configuration, await this.graphqlApi.queryClientById(id)),
    );
  }

  public async updateClientInformationRequest(
    request: UpdateUserInformationRequest,
  ): Promise<void> {
    return this.wrapApiCall(async () =>
      this.graphqlApi.mutationUpdateClientInformation(
        mapUpdateClientInformationRequestToGQL(request),
      ),
    );
  }

  public async getCouriers() {
    return this.wrapApiCall(async () =>
      mapCouriersFromGQL(this.configuration, await this.graphqlApi.queryCouriers()),
    );
  }

  public async getCourierById(id: ID) {
    return this.wrapApiCall(async () =>
      mapCourierFromGQL(this.configuration, await this.graphqlApi.queryCourierById(id)),
    );
  }

  public async updateCourierInformationRequest(
    request: UpdateUserInformationRequest,
  ): Promise<void> {
    return this.wrapApiCall(async () =>
      this.graphqlApi.mutationUpdateCourierInformation(
        mapUpdateCourierInformationRequestToGQL(request),
      ),
    );
  }

  public async evaluateDocumentsRevision(
    courierId: ID,
    type: EvaluateDocumentsRevisionType,
    comment: string,
  ) {
    return this.wrapApiCall(async () =>
      this.graphqlApi.evaluateDocumentsRevision(courierId, type, comment),
    );
  }

  public async getDocuments(revisionId: ID) {
    return this.wrapApiCall(async () =>
      groupDocumentFromGQL(
        this.configuration,
        await this.graphqlApi.queryDocuments(revisionId),
      ),
    );
  }

  public async getRestaurants() {
    return this.wrapApiCall(async () =>
      mapRestaurantsFromGQL(this.configuration, await this.graphqlApi.queryRestaurants()),
    );
  }

  public async getRestaurantById(id: ID) {
    return this.wrapApiCall(async () =>
      mapRestaurantFromGQL(
        this.configuration,
        await this.graphqlApi.queryRestaurantById(id),
      ),
    );
  }

  public async updateRestaurantRequest(
    request: UpdateRestaurantInformationRequest,
  ): Promise<void> {
    return this.wrapApiCall(async () =>
      this.graphqlApi.mutationUpdateRestaurant(request),
    );
  }

  public async createRestaurantRequest(
    request: CreateRestaurantInformationRequest,
  ): Promise<void> {
    return this.wrapApiCall(async () =>
      this.graphqlApi.mutationCreateRestaurant(request),
    );
  }

  public async getCuisines() {
    return this.wrapApiCall(async () =>
      mapCuisinesFromGQL(this.configuration, await this.graphqlApi.queryCuisines()),
    );
  }

  public async getCuisineById(id: string) {
    return this.wrapApiCall(async () =>
      mapCuisineFromGQL(this.configuration, await this.graphqlApi.queryCuisineById(id)),
    );
  }

  public async updateCuisineRequest(request: UpdateCuisineRequest): Promise<Cuisine> {
    return this.wrapApiCall(async () => this.graphqlApi.mutationUpdateCuisine(request));
  }

  public async createCuisineRequest(request: CreateCuisineRequest): Promise<void> {
    return this.wrapApiCall(async () => this.graphqlApi.mutationCreateCuisine(request));
  }

  public async getDishes() {
    return this.wrapApiCall(async () =>
      mapDishesFromGQL(this.configuration, await this.graphqlApi.queryDishes()),
    );
  }

  public async getDishById(id: string) {
    return this.wrapApiCall(async () =>
      mapDishFromGQL(this.configuration, await this.graphqlApi.queryDishById(id)),
    );
  }

  public async updateDishRequest(request: UpdateDishRequest): Promise<Dish> {
    return this.wrapApiCall(async () => this.graphqlApi.mutationUpdateDish(request));
  }

  public async createDishRequest(request: CreateDishRequest): Promise<void> {
    return this.wrapApiCall(async () => this.graphqlApi.mutationCreateDish(request));
  }

  public async getSets() {
    return this.wrapApiCall(async () =>
      mapSetsFromGQL(this.configuration, await this.graphqlApi.querySets()),
    );
  }

  public async getSetById(id: string) {
    return this.wrapApiCall(async () =>
      mapSetFromGQL(this.configuration, await this.graphqlApi.querySetById(id)),
    );
  }

  public async getSetsByDishId(id: string) {
    return this.wrapApiCall(async () =>
      mapSetsFromGQL(this.configuration, await this.graphqlApi.querySetsByDishId(id)),
    );
  }

  public async getSetsByCuisineId(id: string) {
    return this.wrapApiCall(async () =>
      mapSetsFromGQL(this.configuration, await this.graphqlApi.querySetsByCuisineId(id)),
    );
  }

  public async updateSetRequest(request: UpdateSetRequest): Promise<Set> {
    return this.wrapApiCall(async () => this.graphqlApi.mutationUpdateSet(request));
  }

  public async createSetRequest(request: CreateSetRequest): Promise<void> {
    return this.wrapApiCall(async () => this.graphqlApi.mutationCreateSet(request));
  }

  public async distributeSetsByDays(request: DistributeSetsByDaysRequest): Promise<void> {
    return this.wrapApiCall(async () =>
      this.graphqlApi.mutationDistributeSetsByDays(request),
    );
  }

  public async getStatuses() {
    return this.wrapApiCall(async () =>
      mapStatusesFromGQL(this.configuration, await this.graphqlApi.queryStatuses()),
    );
  }

  public async getStatusById(id: string) {
    return this.wrapApiCall(async () =>
      mapStatusFromGQL(this.configuration, await this.graphqlApi.queryStatusById(id)),
    );
  }

  public async updateStatusRequest(request: UpdateStatusRequest): Promise<Status> {
    return this.wrapApiCall(async () => this.graphqlApi.mutationUpdateStatus(request));
  }

  public async createStatusRequest(request: CreateStatusRequest): Promise<void> {
    return this.wrapApiCall(async () => this.graphqlApi.mutationCreateStatus(request));
  }

  public async updateFirebaseToken(request: UpdateFirebaseTokenRequest) {
    return this.wrapApiCall(async () => this.restApi.updateFirebaseToken(request));
  }

  public async deleteOrder(orderId: string) {
    await this.wrapApiCall(async () => this.graphqlApi.queryDeleteOrder(orderId));
  }

  public async deleteRestaurant(restaurantId: string) {
    await this.wrapApiCall(async () =>
      this.graphqlApi.queryDeleteRestaurant(restaurantId),
    );
  }

  public async deleteCuisine(cuisineId: ID) {
    await this.wrapApiCall(async () => this.graphqlApi.queryDeleteCuisine(cuisineId));
  }

  public async deleteDish(dishId: ID) {
    await this.wrapApiCall(async () => this.graphqlApi.queryDeleteDish(dishId));
  }

  public async deleteSet(setId: ID) {
    await this.wrapApiCall(async () => this.graphqlApi.queryDeleteSet(setId));
  }

  public async deleteStatus(statusId: ID) {
    await this.wrapApiCall(async () => this.graphqlApi.queryDeleteStatus(statusId));
  }

  public async removeTheCurrentCourier(orderId: string) {
    await this.wrapApiCall(async () => this.graphqlApi.removeTheCurrentCourier(orderId));
  }
}
