import Joi from 'joi';
import { categoryList } from '../constants/constants.js';

export const createProductShema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required(),
  category: Joi.string()
    .valid(...categoryList)
    .required(),
  description: Joi.string(),
});

export const updateProductShema = Joi.object({
  name: Joi.string(),
  price: Joi.number(),
  category: Joi.string().valid(...categoryList),
  description: Joi.string(),
});
