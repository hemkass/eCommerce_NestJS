import { Morphology, Role } from '@prisma/client';
import { Adress } from '../dtos/create-user.dto';

export interface createUser {
  email: string;
  password: string;
  morphology?: Morphology;
  adress_Delivery?: adressDeliveryCreate;
  adress_Bill?: adressBillCreate;
  weight?: string;
  size?: string;
  token?: string;
  lastname: string;
  firstname: string;
  role?: Role;
}

export interface adressDeliveryCreate {
  create: Adress;
}

export interface adressBillCreate {
  create: Adress;
}
