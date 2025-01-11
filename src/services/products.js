import { productsModel } from '../db/models/product.js';

export const getAllProducts = (filter, userId) => {
  const productQuery = productsModel.find({ userId });
  if (filter.category) {
    productQuery.where('category').equals(filter.category);
  }

  if (filter.minPrice) {
    productQuery.where('price').gte(filter.minPrice);
  }

  if (filter.maxPrice) {
    productQuery.where('price').lte(filter.maxPrice);
  }
  return productQuery;
};

export const getProductById = (productId, userId) => {
  return productsModel.findOne({ _id: productId, userId });
};

export const addProduct = (body) => {
  return productsModel.create(body);
};
