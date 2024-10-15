export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  surName: string;
  dateBirth: number;
  phone: string;
  email: string;
  consultantId?: string;
  regionId?: string;
  regionName?: string;
  cityId?: string;
  cityName?: string;
  address?: string;
  photoPath?: string;
}

export interface CustomerPayload {
  id?: string;
  firstName?: string;
  lastName?: string;
  surName?: string;
  dateBirth?: number;
  phone?: string;
  email?: string;
  consultantId?: string;
  regionId?: string;
  regionName?: string;
  cityId?: string;
  cityName?: string;
  address?: string;
  photoPath?: string;
}
