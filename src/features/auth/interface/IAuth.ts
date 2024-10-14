export interface IAuth {
  id?: number | string;
  email: string;
  password: string;
  resetPasswordToken: string | null;
  resetPasswordExpires?: Date | null;
}