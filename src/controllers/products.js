import createHttpError from 'http-errors';
import {
  addProduct,
  getAllProducts,
  getProductById,
} from '../services/products.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';

export const getAllProductsController = async (req, res) => {
  const userId = req.user._id;
  const filter = parseFilterParams(req.query);

  const products = await getAllProducts(filter, userId);
  res.json({
    status: 200,
    message: 'Successfully found products!',
    data: products,
  });
};

export const getProductsByIdController = async (req, res) => {
  const userId = req.user._id;

  const { productId } = req.params;

  const product = await getProductById(productId, userId);
  if (!product) throw createHttpError(404, 'Product not found');

  res.json({
    status: 200,
    message: `Successfully found product with id ${productId}!`,
    data: product,
  });
};

export const addProductController = async (req, res) => {
  const userId = req.user._id;

  const product = await addProduct({
    ...req.body,
    userId,
  });
  res.status(201).json({
    status: 201,
    message: 'Successfully created a product!',
    data: product,
  });
};
