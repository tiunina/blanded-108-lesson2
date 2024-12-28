import { productsModel } from '../db/models/product.js';

export const getAllProducts = (filter) => {
  const productQuery = productsModel.find();
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

export const getProductById = (productId) => {
  return productsModel.findById(productId);
};

export const addProduct = (body) => {
  return productsModel.create(body);
};
