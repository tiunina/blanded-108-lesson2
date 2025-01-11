import bcrypt from 'bcrypt';
import { userModel } from '../db/models/user.js';
import createHttpError from 'http-errors';
import { SessionsModel } from '../db/models/auth.js';
import { randomBytes } from 'crypto';
import { FIFTEEN_MINUTES, ONE_DAY } from '../constants/constants.js';

export const registerUser = async (body) => {
  const user = await userModel.findOne({ email: body.email });
  if (user) throw createHttpError(409, 'Email in use');
  const encryptedPassword = await bcrypt.hash(body.password, 10);
  return await userModel.create({ ...body, password: encryptedPassword });
};

export const loginUser = async (payload) => {
  const user = await userModel.findOne({ email: payload.email });
  if (!user) throw createHttpError(404, 'user not found');
  const isEqual = await bcrypt.compare(payload.password, user.password);
  if (!isEqual) {
    throw createHttpError(401, 'Unauthorized');
  }

  await SessionsModel.deleteOne({ userId: user._id });

  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');

  return await SessionsModel.create({
    userId: user._id,
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + ONE_DAY),
  });
};
