// name - string, required
// price - number, required
// category - string, enum('books', 'electronics', 'clothing', 'other'), required, default 'other'
// description - string, optional
// createdAt - дата створення
// updatedAt - дата оновлення

import { categoryList } from '../../constants/constants.js';

import { Schema, model } from 'mongoose';

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      enum: categoryList,
      required: true,
      default: 'other',
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);
export const productsModel = model('product', productSchema);
