export interface Amount {
  amount: string;
  currency: Currency;
}

export type Currency = 'INR' | 'USD';

export interface DateObject {
  date: string;
  timezone: string;
  timezone_type: number;
}

export interface ListObject {
  size?: number;
  page?: number;
  limit: number;
}

export interface ShortInfo {
  id: number;
  name: string;
  slug: string;
}

export enum Origin {
  AFTERMARKET = 0,
  OEM = 1,
}
export enum SortProducts {
  NEW = 'new',
  ASC = 'price',
  DESC = '-price',
}
export enum PageLimit {
  CATALOG = 48,
  LIST = 25,
}
export enum PaymentMethods {
  PAYTM = 'paytm',
  RAZORPAY = 'razorpay',
  BOODMO_WALLET = 'boodmo_wallet',
}

export type FormProcessType = 'edit' | 'add';

export interface ListResponse {
  list: {
    size?: number;
    page?: number;
    limit: number;
  };
}

export interface Hashable {
  [key: string]: any;
}

export interface ErrorResponse {
  detail: string;
  status?: number;
  type: string;
  title?: string;
  needSubscription?: boolean;
  paymentProvider?: string;
}

export interface SuccessResponse {
  success: boolean;
}

export enum RequestMessages {
  WISHLIST_NOT_FOUND = 'Wishlist with such ID was not found',
  ERROR = 'Something went wrong. Please try again later.',
}

export const ORIPARTS_QUERY_PARAMS = `back_url_id=${encodeURIComponent(
  'https://boodmo.com/catalog/part-p-{item_id}/'
)}&back_url_pn=${encodeURIComponent('https://boodmo.com/search/{pn}/')}`;

export interface SidenavMenuitem {
  label: string;
  href?: string;
  routerLink?: string;
}

export interface CampaignLinksItem extends SidenavMenuitem {
  show: boolean;
  childVisible?: boolean;
  icon?: string;
  iconMobile?: string;
  child?: CampaignLinksItem[];
}

export const DEBUG_MODE_KEY = 'debug_mode';
