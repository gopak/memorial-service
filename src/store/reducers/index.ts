import { combineReducers } from 'redux';

import { esbApi } from '../store/services/esbApi';
import { marketplaceApi } from '../store/services/marketplaceApi';
import { CartState } from '../types/Cart.type';
import { CoreState } from '../types/core.model';
import { ProductState } from '../types/product.model';
import { UserState } from '../types/User.type';
import alert, { AlertState } from './alert';
import cart from './cart';
import catalog, { CatalogState } from './catalog';
import checkout, { CheckoutState } from './checkout';
import cms from './Cms';
import core from './core';
import device from './Device';
import navigator, { NavigatorState } from './navigator';
import network, { NetworkState } from './Network';
import notifications, { NotificationsState } from './notifications';
import orders, { OrdersState } from './orders';
import parts, { PartsState } from './Parts';
import payment, { PaymentState } from './Payment';
import product from './product';
import service, { ServiceState } from './Service';
import sessionStorageSlice, { SessionStorageState } from './sessionStorage';
import smartSearch, { SmartSearchState } from './SmartSearch';
import user from './user';
import vehicles, { VehiclesState } from './Vehicles';
import wishlist, { WishlistState } from './Wishlists';

export interface RootState {
  alert: AlertState;
  network: NetworkState;
  device: Record<string, any>;
  vehicles: VehiclesState;
  parts: PartsState;
  product: ProductState;
  cart: CartState;
  core: CoreState;
  checkout: CheckoutState;
  user: UserState;
  orders: OrdersState;
  payment: PaymentState;
  navigator: NavigatorState;
  service: ServiceState;
  notifications: NotificationsState;
  smartSearch: SmartSearchState;
  cms: Record<string, any>;
  catalog: CatalogState;
  wishlist: WishlistState;
  [sessionStorageSlice.name]: SessionStorageState;
}
const rootReducer = combineReducers({
  [marketplaceApi.reducerPath]: marketplaceApi.reducer,
  [esbApi.reducerPath]: esbApi.reducer,
  [sessionStorageSlice.name]: sessionStorageSlice.reducer,
  alert,
  network,
  device,
  vehicles,
  parts,
  product,
  cart,
  core,
  checkout,
  user,
  orders,
  payment,
  navigator,
  service,
  notifications,
  smartSearch,
  cms,
  catalog,
  wishlist,
});

export default rootReducer;
