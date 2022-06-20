import {ISpoonAndForkApi} from 'api/ISpoonAndForkApi';
import RegisterRequest from './entities/RegisterRequest';
import LoginRequest from './entities/LoginRequest';
import RestApi from 'api/rest/RestApi';
import ApiConfiguration from '@spryrocks/react-api/ApiConfiguration';
import SpoonAndForkGraphqlApi from 'api/graphql/SpoonAndForkGraphqlApi';
import ForgotPasswordRequest from 'api/entities/ForgotPasswordRequest';
import ApiDelegate, {AuthInfo} from '@spryrocks/react-api/ApiDelegate';
import IApiTokenHolder from '@spryrocks/react-api/IApiTokenHolder';
import UpdateFirebaseTokenRequest from 'api/entities/UpdateFirebaseTokenRequest';
import {
  mapCuisineFromGQL,
  mapCuisineListFromGQL,
  mapDishesFromGQL,
  mapDishFromGQL,
  mapIngredientsFromGQL,
  mapOrderFromGQL,
  mapOrdersFromGQL,
  mapSetFromGQL,
  mapSetsFromGQL,
  mapPreferencesFromGQL,
  mapMyAccountFromGQL,
  mapBagsFromGQL,
  mapAddressFromGQL,
  mapCartFromGQL,
  mapCreateCartRequestToGQL,
  mapLatLngFromGQL,
  groupDocumentFromGQL,
  mapDocumentFromGQL,
  mapDocumentsRevisionFromGQL,
  mapDocumentGroupToGQL,
  mapCartsFromGQL,
  mapAddressesFromGQL,
  mapRestaurantFromGQL,
  mapEmailForSpamFromGQL,
} from './Mappers';
import Order from 'entities/Order';
import Cart from 'entities/Cart';
import {DocumentsGroup} from 'entities/Documents';
import Preferences from 'state/entities/Preferences';
import CreateCartRequest from 'api/entities/CreateCartRequest';
import LatLng from 'entities/LatLng';
import {UserLocation} from 'state/entities/UserAddress';
import UpdatePreferences from 'api/entities/UpdatePreferences';
import {ID} from 'entities/Common';
import Address from 'entities/Address';
import Set from 'entities/Set';
import ApiBase from '@spryrocks/react-api/ApiBase';
import UpdateUserRequest from 'state/ducks/session/models';
import Restaurant from 'entities/Restaurant';
import {EmailForSpam} from 'state/entities/EmailForSpam';

export default class SpoonAndForkApi extends ApiBase implements ISpoonAndForkApi {
  private readonly restApi: RestApi;

  private readonly graphqlApi: SpoonAndForkGraphqlApi;

  constructor(
    configuration: ApiConfiguration,
    delegate: ApiDelegate,
    tokenHolder: IApiTokenHolder,
  ) {
    super(configuration, delegate, tokenHolder);
    if (!configuration.graphql) throw new Error('GraphQL api config should be provided');
    this.graphqlApi = new SpoonAndForkGraphqlApi(
      this.baseUrl,
      this.wsBaseUrl,
      configuration.graphql,
      this.delegate,
    );
    if (!configuration.rest) throw new Error('Rest api config should be provided');
    this.restApi = new RestApi(this.baseUrl, configuration.rest, this.delegate);
  }

  public async register(request: RegisterRequest) {
    return this.restApi.register(request);
  }

  public async login(request: LoginRequest) {
    return this.restApi.login(request);
  }

  public async myAccount() {
    return this.wrapApiCall(async () =>
      mapMyAccountFromGQL(this.configuration, await this.graphqlApi.queryMyAccount()),
    );
  }

  public async forgotPassword(request: ForgotPasswordRequest) {
    return this.restApi.forgotPassword(request);
  }

  public async updateUserPassword(oldPassword: string, password: string) {
    return this.wrapApiCall(async () =>
      this.restApi.changePassword({oldPassword, password}),
    );
  }

  public async updateFirebaseToken(request: UpdateFirebaseTokenRequest) {
    return this.wrapApiCall(async () => this.restApi.updateFirebaseToken(request));
  }

  findBagByCode(code: string) {
    return this.wrapApiCall(async () => this.graphqlApi.queryBagByCode(code));
  }

  public async getBagsByOrderId(id: string) {
    return this.wrapApiCall(async () =>
      mapBagsFromGQL(await this.graphqlApi.queryBagsByOrderId(id)),
    );
  }

  public async updateUserProfile(updateRequest: UpdateUserRequest) {
    return this.wrapApiCall(async () =>
      mapMyAccountFromGQL(
        this.configuration,
        await this.graphqlApi.mutationUserProfile(updateRequest),
      ),
    );
  }

  public async createAddress(address: UserLocation) {
    return this.wrapApiCall(async () =>
      mapAddressFromGQL(await this.graphqlApi.mutationCreateAddress(address)),
    );
  }

  public async createEmailForSpam(email: EmailForSpam) {
    return this.wrapApiCall(async () =>
      mapEmailForSpamFromGQL(await this.graphqlApi.mutationCreateEmailForSpam(email)),
    );
  }

  public async loadUserProfilePreferences() {
    return this.wrapApiCall(async () =>
      mapPreferencesFromGQL(await this.graphqlApi.queryPreferences()),
    );
  }

  public async updateUserProfilePreferences(preferences: Preferences) {
    return this.wrapApiCall(async () =>
      mapPreferencesFromGQL(
        await this.graphqlApi.mutationUserProfilePreferences(preferences),
      ),
    );
  }

  protected async refreshToken(refreshToken: string): Promise<AuthInfo> {
    const session = await this.restApi.refresh({refreshToken});
    return {accessToken: session.jwt, refreshToken: session.refreshToken};
  }

  public async getIngredientsByDishId(dishId: string) {
    return this.wrapApiCall(async () =>
      mapIngredientsFromGQL(await this.graphqlApi.queryIngredientsByDishId(dishId)),
    );
  }

  public async acceptOrder(orderId: string) {
    return this.wrapApiCall(async () => {
      return this.graphqlApi.acceptOrderMutation(orderId);
    });
  }

  public async markOrder(orderId: string, bag: string) {
    await this.wrapApiCall(async () => {
      await this.graphqlApi.markOrderMutation(orderId, bag);
    });
  }

  public async getDishById(dishId: string) {
    return this.wrapApiCall(async () =>
      mapDishFromGQL(this.configuration, await this.graphqlApi.queryDishById(dishId)),
    );
  }

  public async getDishesBySetId(setId: string) {
    return this.wrapApiCall(async () =>
      mapDishesFromGQL(
        this.configuration,
        await this.graphqlApi.queryDishesBySetId(setId),
      ),
    );
  }

  public async getSetById(setId: string) {
    return this.wrapApiCall(async () =>
      mapSetFromGQL(this.configuration, await this.graphqlApi.querySetById(setId)),
    );
  }

  public async getSetsByCuisineId(cuisineId: string) {
    return this.wrapApiCall(async () =>
      mapSetsFromGQL(
        this.configuration,
        await this.graphqlApi.querySetsByCuisineId(cuisineId),
      ),
    );
  }

  public async getOrdersByCartId(cartId: string) {
    return this.wrapApiCall(async () =>
      mapOrdersFromGQL(
        this.configuration,
        await this.graphqlApi.queryOrdersByCartId(cartId),
      ),
    );
  }

  public async getOrdersByRestaurantId(): Promise<Order[]> {
    return this.wrapApiCall(async () =>
      mapOrdersFromGQL(
        this.configuration,
        await this.graphqlApi.queryOrdersByRestaurantId(),
      ),
    );
  }

  public async getOrdersByUserId(): Promise<Order[]> {
    return this.wrapApiCall(async () =>
      mapOrdersFromGQL(this.configuration, await this.graphqlApi.queryOrdersByUserId()),
    );
  }

  public async getOrdersByCourierId(): Promise<Order[]> {
    return this.wrapApiCall(async () =>
      mapOrdersFromGQL(
        this.configuration,
        await this.graphqlApi.queryOrdersByCourierId(),
      ),
    );
  }

  public async getClientOrdersAddresses(): Promise<Address[]> {
    return this.wrapApiCall(async () =>
      mapAddressesFromGQL(await this.graphqlApi.queryClientOrdersAddresses()),
    );
  }

  public async getUserCarts(): Promise<Cart[]> {
    return this.wrapApiCall(async () =>
      mapCartsFromGQL(await this.graphqlApi.queryUserCarts()),
    );
  }

  public async getSets(): Promise<Set[]> {
    return this.wrapApiCall(async () =>
      mapSetsFromGQL(this.configuration, await this.graphqlApi.querySets()),
    );
  }

  public async getRestaurant(): Promise<Restaurant> {
    return this.wrapApiCall(async () =>
      mapRestaurantFromGQL(this.configuration, await this.graphqlApi.queryRestaurant()),
    );
  }

  public async getCuisineById(cuisineId: string) {
    return this.wrapApiCall(async () =>
      mapCuisineFromGQL(
        this.configuration,
        await this.graphqlApi.queryCuisineById(cuisineId),
      ),
    );
  }

  public async getCuisinesByRestaurantId(restaurantId: string) {
    return this.wrapApiCall(async () =>
      mapCuisineListFromGQL(
        this.configuration,
        await this.graphqlApi.queryCuisinesByRestaurantId(restaurantId),
      ),
    );
  }

  public async getCuisineList() {
    return this.wrapApiCall(async () =>
      mapCuisineListFromGQL(this.configuration, await this.graphqlApi.queryCuisineList()),
    );
  }

  public async getOrdersForDelivery(): Promise<Order[]> {
    return this.wrapApiCall(async () =>
      mapOrdersFromGQL(
        this.configuration,
        await this.graphqlApi.queryOrdersForDelivery(),
      ),
    );
  }

  public async getOrderById(id: string) {
    return this.wrapApiCall(async () =>
      mapOrderFromGQL(this.configuration, await this.graphqlApi.queryOrderById(id)),
    );
  }

  public async createCart(request: CreateCartRequest): Promise<Cart> {
    return this.wrapApiCall(async () =>
      mapCartFromGQL(
        await this.graphqlApi.mutationSaveNewCart(
          mapCreateCartRequestToGQL(this.configuration, request),
        ),
      ),
    );
  }

  public async getDistanceToRestaurant(restaurantId: string, lat: number, lng: number) {
    return this.wrapApiCall(async () =>
      this.graphqlApi.queryDistanceToRestaurant(restaurantId, lat, lng),
    );
  }

  public async preferences() {
    return this.wrapApiCall(async () =>
      mapPreferencesFromGQL(await this.graphqlApi.queryPreferences()),
    );
  }

  public async updatePreferences(request: UpdatePreferences) {
    return this.wrapApiCall(async () => {
      const pref = await this.graphqlApi.mutationPreferences(request);
      return mapPreferencesFromGQL(pref);
    });
  }

  public async getUserLocation(id: string) {
    return this.wrapApiCall(async () => {
      const location = await this.graphqlApi.queryUserLocation(id);
      return location ? mapLatLngFromGQL(location) : undefined;
    });
  }

  public async updateUserLocation(latLng: LatLng) {
    return this.wrapApiCall(async () =>
      this.graphqlApi.mutationUpdateUserLocation(latLng),
    );
  }

  public async getCurrentRevision() {
    return this.wrapApiCall(async () => {
      const revision = await this.graphqlApi.queryCurrentRevision();
      return revision ? mapDocumentsRevisionFromGQL(revision) : undefined;
    });
  }

  public async requestDocumentsRevisionVerification(revisionId: string) {
    return this.wrapApiCall(async () =>
      this.graphqlApi.mutationRequestDocumentsRevisionVerification(revisionId),
    );
  }

  public async addDocuments(fileId: string, group: DocumentsGroup) {
    return this.wrapApiCall(async () =>
      mapDocumentFromGQL(
        this.configuration,
        await this.graphqlApi.mutationAddDocument(fileId, mapDocumentGroupToGQL(group)),
      ),
    );
  }

  public async deleteDocument(documentId: string) {
    return this.wrapApiCall(async () =>
      this.graphqlApi.mutationDeleteDocument(documentId),
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

  public async uploadFile(uri: string) {
    return this.restApi.uploadFile(uri);
  }

  public async updateUserProfileImage(imageId: string): Promise<void> {
    return this.wrapApiCall(async () =>
      this.graphqlApi.mutationUpdateMyAccountImage(imageId),
    );
  }
}
