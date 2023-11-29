import ProductModel from '../models/productModel.js';
import { Types } from 'mongoose';

class ProductDao {
  getProducts = async (page, filter, sort, limit) => {
    try {
      // Get the total number of products in the database based on the filter
      // estimatedDocumentCount: improve performance when dealing with large datasets
      const totalProducts = await ProductModel.estimatedDocumentCount(filter);
      const totalPages = Math.ceil(totalProducts / limit);

      const skip = (page - 1) * limit;
      let products = await ProductModel.find(filter).skip(skip).limit(limit);

      if (sort) {
        products = await ProductModel.find(filter)
          .sort({ price: sort === 'asc' ? 1 : -1 })
          .skip(skip)
          .limit(limit);
      }

      const hasNextPage = page < totalPages;
      const hasPrevPage = page > 1;
      const prevPage = hasPrevPage ? page - 1 : null;
      const nextPage = hasNextPage ? page + 1 : null;
      const prevLink = hasPrevPage
        ? `/api/products?limit=${limit}&page=${prevPage}`
        : null;
      const nextLink = hasNextPage
        ? `/api/products?limit=${limit}&page=${nextPage}`
        : null;

      return {
        status: 'success',
        payload: products,
        totalPages,
        prevPage,
        nextPage,
        page,
        hasPrevPage,
        hasNextPage,
        prevLink,
        nextLink,
      };
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  getProductById = async (id) => {
    console.log('id', id);
    try {
      // Validation of id
      if (!Types.ObjectId.isValid(id)) {
        return {
          statusCode: 404,
          message: 'Not found',
        };
      }

      const product = await ProductModel.findById(id);
      return product;
    } catch (error) {
      return null;
    }
  };
}

const productDao = new ProductDao();

export default productDao;
