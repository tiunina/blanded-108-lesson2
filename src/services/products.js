import { productsModel } from '../db/models/product.js';

export const getAllProducts = () => {
  return productsModel.find();
};

export const getProductById = (productId) => {
  return productsModel.findById(productId);
};
