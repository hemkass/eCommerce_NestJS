export interface googleJWT {
  email: string;
  id?: string;
  admin?: boolean | null;
  token?: string | null;
  firstName?: string;
  lastName?: string;
  picture?: string;
  accessToken?: string;
}
