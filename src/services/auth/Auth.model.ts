import { Place } from 'react-native-google-places-sdk';

import type { ErrorResponse } from './Common.type';

/**
 * User Info
 */

export type UserAddress = {
  pin: string;
  city: string;
  phone: string;
  state: string;
  address: string;
  country: string;
  last_name: string;
  country_id: number;
  first_name: string;
};

export enum FirebaseAuthProvider {
  APPLE = 'apple.com',
  GOOGLE = 'google.com',
  FACEBOOK = 'facebook.com',
  PASSWORD = 'password',
  PHONE = 'phone',
  EMAIL_LINK = 'email_link',
  BIOMETRICS = 'biometrics',
  PASSKEY = 'passkey',
}
export enum AuthorizationMethod {
  'google.com' = 'google',
  'apple.com' = 'apple',
  'facebook.com' = 'facebook',
  'password' = 'email',
  'phone' = 'phone',
}

export interface SignInEmailParams {
  email: string;
  password: string;
  isPasswordUpdate?: boolean;
}

export type SignInFacebookPayload = {
  provider: FirebaseAuthProvider;
  accessToken: string;
  facebook_user_id: string;
  email?: string;
  user: never;
};
export type SignInApplePayload = {
  provider: FirebaseAuthProvider;
  accessToken: string;
  facebook_user_id: never;
  email: never;
  user: string;
};

export type SignInSocialPayload = SignInFacebookPayload | SignInApplePayload;

/**
 * Business
 */

export type AddressType = 'billing' | 'shipping';
export enum ADDRESS_TYPE {
  SHIPPING = 'shipping',
  BILLING = 'billing',
}

export interface GetAddressListParams {
  addressType: ADDRESS_TYPE;
  callback?: (response?: any) => void;
  skipFilter?: boolean;
}

export interface UpdateAddressParams {
  address: ProcessAddressPayload;
  callback?: (response?: any) => void;
  pageType?: string;
}

export interface DeleteAddressParams {
  id: string;
  type: ADDRESS_TYPE;
}

export type AddressGeolocation = {
  latitude: number;
  longitude: number;
} | null;

export interface Address {
  id: string;
  first_name: string;
  last_name: string;
  state:
    | string
    | {
        id: string;
        name: string;
      };
  city: string;
  address: string;
  pin: number;
  phone: string;
  gst: string;
  company_name?: string;
  is_default: boolean;
  without_gst?: boolean;
  country_id: number;
  country: string;
  title: string;
  delivery_params: {
    blocked: boolean;
    blocked_msg: string;
    slow_delivery: boolean;
  };
  type: ADDRESS_TYPE;
  valid?: boolean;
  geoLocation?: AddressGeolocation;
}

export interface ProcessAddressPayload {
  id?: string;
  first_name?: string;
  last_name?: string;
  city?: string;
  address?: string;
  pin?: string | number;
  phone?: string;
  type: ADDRESS_TYPE;
  state?: string;
  is_default?: boolean;
  country?: string;
  title?: string;
  gst?: string;
  company_name?: string;
  without_gst?: boolean;
  geoLocation?: AddressGeolocation;
}

export type Addresses = {
  [key in AddressType]: Address;
};

export type AccountType = {
  code: string;
  name: string;
  business_account: boolean | null;
  registered_gst: boolean;
};

// Address validation

export type CheckAddressParams = {
  pin: number;
  state?: string;
  gst?: string | null;
};

export type CheckAddressResponse = {
  pin: number;
  state: string;
  city: string;
  pin_exist: boolean;
  pin_belong_state: boolean;
  gst_unique: boolean;
  gst_belong_state: boolean;
  gst_valid: boolean;
};

/**
 * Garage
 */
export type GarageCarItem = {
  modification_id: number;
  modification_name: string;
  modification_slug: string;
  car_maker_id: number;
  car_maker_name: string;
  car_maker_slug: string;
  model_id: number;
  model_name: string;
  model_line_id: number;
  model_line_slug: string;
  model_line_name: string;
  vin: string | null;
  year: number;
  image: string;
  customer_vehicle_id: number;
  type_engine: number;
  type_liters: string;
  oem_brand_url: string;
};

export type GarageCarItemPayload = {
  customer_vehicle_id?: number;
  vehicle_id: number;
  year: number;
  vin?: string | null;
};

export interface B2BManager {
  email: string;
  name: string;
  phone: string;
  workingHours: string;
}

export interface UserInfo {
  access_token: string;
  id: number;
  addresses: UserAddresses;
  company_name: string;
  email: string;
  first_name: string;
  last_name: string;
  pin: number;
  phone: string;
  providers?: Record<string, any> | null;
  role: string;
  account_type: UserAccountType;
  shippingAddress: Address[];
  billingAddress: Address[];
  BT: number;
  pnvis: boolean;
  allowSelfRemove: boolean;
  hasDevicePublicKey: boolean;
  isBlockedRma: boolean;
  b2bManager: B2BManager;
  b2b: boolean;
  registeredGst: boolean;
}

export interface UserAddresses {
  billing: Address;
  shipping: Address;
}

export enum AccountTypes {
  BUSINESS_GST = 'business_gst',
  BUSINESS_WITHOUT_GST = 'business_account',
  INDIVIDUAL = 'individual',
  UNDEFINED = 'undefined',
}

export interface UserAccountType {
  business_account: boolean | null;
  code: AccountTypes;
  name: string;
  registered_gst: boolean;
}

export interface CheckAddressPayload {
  pin: number;
  state?: string;
  gst?: string;
}

export interface UserState {
  email: string;
  profile: UserInfo | null;
  first_name: string | null;
  last_name: string | null;
  car_id: null;
  car_link: string | null;
  car_name: string | null;
  ori_link: string | null;
  phone: string | null;
  gst: string | null;
  company_name: string | null;
  access_token: string | null;
  refresh_token: string | null;
  token_type: string | null;
  tokenExpires: number;
  loginExpires: null;
  fbUserId: null;
  fbToken: string | null;
  signedIn: boolean;
  signedOut: boolean;
  isFetching: boolean;
  recoveryIsFetching: boolean;
  refreshTokenIsFetching: boolean;
  updateProfileIsFetching: boolean;
  updateProfileError: boolean;
  updateProfileErrorDetail: string;
  updateProfileErrors: [];
  authError: string;
  registerError: string;
  signInSocialError: string | null;
  sentRecoveryMessage: boolean;
  emailExists: 'empty';
  checkEmailLoading: false;
  offlineLoadedAuth: boolean;
  freshTokenPromise: null;
  freshdeskTicketTypes: FreshdeskTicket[];
  freshdeskTicketTypesLoading: boolean;
  freshdeskTicketTypesError: ErrorResponse;
  freshdeskFeedbackSuccess: FreshdeskAddTicketResponse | null;
  freshdeskFeedbackLoading: boolean;
  freshdeskFeedbackLoaded: boolean;
  freshdeskErr: boolean;
  freshdeskModalVisible: boolean;
  user_id: number | null;
  auth_type: 'email' | 'facebook';
  c_uid: string | null;
  currentCurrency: {
    name: string;
    value: string;
    unicode: string;
  };
  address: UserAddress | null;
  addresses: Addresses | null;
  account_type: UserAccountType;
  BT: number;
  pinInfo: CheckAddressResponse;
  pinInfoLoading: boolean;
  pinInfoError: ErrorResponse;
  garageCars: GarageCarItem[];
  garageCarsLoading: boolean;
  garageCarsError: ErrorResponse;
  addGarageCarItemLoading: boolean;
  addGarageCarItemLoaded: boolean;
  addGarageCarItemError: Object;
  editGarageCarItemLoading: boolean;
  editGarageCarItemLoaded: boolean;
  editGarageCarItemError: Object;
  deleteGarageCarItemLoading: boolean;
  deleteGarageCarItemError: Object;
  shippingAddress: Address[];
  billingAddress: Address[];
  getShippingAddressIsFetching: boolean;
  getBillingAddressFetching: boolean;
  addAddressShippingError: ErrorResponse;
  addAddressBillingError: ErrorResponse;
  onboarding: boolean;
  promoteBiometricsPopup: boolean;
  socialPayload: SignInSocialPayload;
  needReloadPhoneProvider: boolean;
  geolocationResult: Place;
  geolocationCoordinates: AddressGeolocation;
  geolocationConfirmed: boolean;
}

/**
 * Freshdesk
 */

export interface FreshdeskCustomFields {
  [key: string]: string;
  cf_device: string;
}

export interface FreshdeskAddTicketResponse {
  success: boolean;
}

export interface FreshdeskTicket {
  id: number;
  value: string;
  fields: FreshdeskTicketField[];
}

export interface FreshdeskTicketField {
  id: number;
  name: string;
  label: string;
  label_for_customers: string;
  type: string;
  customers_can_edit: boolean;
  required_for_closure: boolean;
  required_for_agents: boolean;
  required_for_customers: boolean;
  displayed_to_customers: boolean;
  archived: boolean;
  choices?: FreshdeskTicketFieldChoices[];
}

export interface FreshdeskTicketFieldChoices {
  id: number;
  value: string;
}

export interface FreshdeskAddTicketPayload {
  email: string;
  name?: string;
  type: string;
  description: string;
  custom_fields: FreshdeskCustomFields;
  status?: number;
  priority?: number;
  source?: number;
  tags?: string[];
  orderNumber?: string;
}

// Profile

export interface UpdateProfileParams {
  company_name?: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  address?: string;
  pin?: number;
  providers?: any | null;
  password?: string;
  passwordVerify?: string;
  skipMessage?: boolean;
}

export interface GetProfileParams {
  isNewUser?: boolean;
  isLogin?: boolean;
}

export interface UpdateReferencePayload {
  value: string;
  id: string;
}

export interface WalletBalance {
  id: string;
  description: string;
  updatedAt: number;
  totalBalance: number;
  creditLimit: number;
}
