import { IAuth } from "../interface/IAuth";

export class AuthAdapter {
  public adapt(item: IAuth): Omit<IAuth, 'resetPasswordToken' | 'resetPasswordExpires'> {
    const { email, password } = item;
    return { email, password };
  }
}
