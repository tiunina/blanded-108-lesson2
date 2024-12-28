import bcrypt from 'bcrypt';
import { userModel } from '../db/models/user.js';
import createHttpError from 'http-errors';

export const registerUser = async (body) => {
  const user = await userModel.findOne({ email: body.email });
  if (user) throw createHttpError(409, 'Email in use');
  const encryptedPassword = await bcrypt.hash(body.password, 10);
  return await userModel.create({ ...body, password: encryptedPassword });
};
