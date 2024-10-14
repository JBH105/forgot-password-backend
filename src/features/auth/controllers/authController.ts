import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { generateResetToken } from '@root/utils/generateToken';
import { createAccount, findeUserWithEmail, findeUserWithToken } from '../services/userService';
import { sendResetEmail } from '@root/utils/sendMail';
import { IAuth } from '../interface/IAuth';

export const forgotPassword = async (req: Request, res: Response) => {
    const { email } = req.body;
    const user = await findeUserWithEmail(email)

    if (!user) return res.status(404).send({ error: 'User not found' });

    const token = generateResetToken();
    user.resetPasswordToken = token;
    user.resetPasswordExpires = new Date(Date.now() + 3600000); // 1 hour
    await user.save();

    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
    await sendResetEmail(user.email, resetLink);

    res.status(200).send({ messge: 'Reset password email sent' });
};

export const resetPassword = async (req: Request, res: Response) => {
    const { token, password } = req.body;
    const user = await findeUserWithToken(token)

    if (!user) return res.status(400).send({ error: 'Token is invalid or expired' });

    user.password = await bcrypt.hash(password, 10);
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    await user.save();

    res.status(200).send({ messge: 'Password updated successfully' });
};

export const createUser = async (req: Request, res: Response) => {
    const model: IAuth = req.body;
    const user = await findeUserWithEmail(model.email)
    if (user) return res.status(404).send({ error: 'User already exists' });

    await createAccount(model)
    res.status(200).send({ messge: 'User Created successfully' });
};