import { AuthAdapter } from "../adapter/auth-adapter";
import { IAuth } from "../interface/IAuth";
import { AccountEntity } from "../models/userModel";

export const findeUserWithEmail = async (email: string) => {
    return await AccountEntity.findOne({ where: { email } });
};

export const findeUserWithToken = async (token: string) => {
    return await AccountEntity.findOne({
        where: {
            resetPasswordToken: token,
            // resetPasswordExpires: { $gt: new Date() }
        }
    });
};

export const createAccount = async (model: IAuth) => {
    try {
        const result = new AuthAdapter().adapt(model);
        return await AccountEntity.create(result);
    } catch (error) {
        console.log("🚀 ~ createAccount ~ error:", error)
    }
};