export interface Consultant {
  id: string;
  firstName: string;
  lastName: string;
  surName: string;
  dateBirth: number;
  phone: string;
  email: string;
  regionId?: string;
  regionName?: string;
  cityId?: string;
  cityName?: string;
  address?: string;
  photoPath?: string;
  description?: string;
  services: ConsultantService[];
  clientIds: string[];
}

export interface ConsultantService {
  title: string;
  cost: number;
  description: string;
}

export interface ConsultantPayload {
  id?: string;
  firstName?: string;
  lastName?: string;
  surName?: string;
  dateBirth?: number;
  phone?: string;
  email?: string;
  regionId?: string;
  regionName?: string;
  cityId?: string;
  cityName?: string;
  address?: string;
  photoPath?: string;
  description?: string;
}
