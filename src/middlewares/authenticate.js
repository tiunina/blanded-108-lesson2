import createHttpError from 'http-errors';
import { SessionsModel } from '../db/models/auth.js';
import { userModel } from '../db/models/user.js';

export const authenticate = async (req, resizeBy, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    next(createHttpError(401, 'Please provide Authorization header'));
    return;
  }
  const [bearer, token] = authHeader.split(' ');
  if (bearer !== 'Bearer' || !token) {
    next(createHttpError(401, 'Auth header should be of type Bearer'));
    return;
  }
  const session = await SessionsModel.findOne({ accessToken: token });
  // console.log('session', session);
  if (!session) {
    next(createHttpError(401, 'Session not found'));
    return;
  }

  const isAccesTokenExpired =
    new Date() > new Date(session.accessTokenValidUntil);
  if (isAccesTokenExpired)
    return next(createHttpError(401, 'Access token expired'));

  const user = await userModel.findById(session.userId);
  if (!user) {
    next(createHttpError(401));
    return;
  }
  req.user = user;
  next();
};
