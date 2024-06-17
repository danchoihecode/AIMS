export interface UserDTO {
  id: string;
  fullName: string;
  email: string;
  password: string;
  phone: number;
  address: string;
  isAdmin?: boolean;
  isManager?: boolean;
  isBlocked?: boolean;
}
