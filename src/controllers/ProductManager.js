import Product from '../models/productModel.js';
class ProductManager {
  constructor() {
    this.products = [];
  }

  static id = 0;

  addProduct = async (title, description, price, thumbnailImg, code, stock) => {
    ProductManager.id += 1;

    const newProduct = new Product({
      title,
      description,
      price,
      thumbnailImg,
      code,
      stock,
      id: ProductManager.id,
    });

    try {
      await newProduct.save();
      console.log(newProduct);
    } catch (error) {
      console.error(error);
    }
  };
  /**
   * Retrieves a list of products with optional pagination, sorting, and filtering.
   * @param {number} limit - The maximum number of products to return (default is 10).
   * @param {number} page - The page number to retrieve (default is 1).
   * @param {string} sort - The sorting order ('asc' for ascending, 'desc' for descending).
   * @param {string} query - The type of element to search for (e.g., category or availability).
   * @returns {Object} - An object containing the list of products, pagination details, and status.
   */
  getProducts = async (limit = 10, page = 1, sort, query) => {
    try {
      // Construct the filter based on the query parameter (e.g., category or availability)

      let filter = {};
      if (query) {
        if (query === 'in stock' || query === 'out of stock') {
          filter = { availability: query }; // Filter by availability
        } else {
          filter = { category: query }; // Filter by category
        }
      }

      // Get the total number of products in the database based on the filter
      // estimatedDocumentCount: improve performance when dealing with large datasets
      const totalProducts = await Product.estimatedDocumentCount(filter);
      const totalPages = Math.ceil(totalProducts / limit);

      const skip = (page - 1) * limit;
      let products = await Product.find(filter).skip(skip).limit(limit);

      if (sort) {
        products = await Product.find(filter)
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
      return { status: 'error', payload: [] };
    }
  };

  getProductById = async (id) => {
    try {
      const product = await Product.findOne({ id });
      if (product) {
        console.log('Exists:', product);
      } else {
        console.log('Not found');
      }
    } catch (error) {
      console.error(error);
    }
  };

  deleteProductById = async (id) => {
    try {
      await Product.deleteOne({ id });
      console.log('Product deleted');
    } catch (error) {
      console.error(error);
    }
  };

  updateProducts = async ({ id, ...product }) => {
    try {
      const updatedProduct = await Product.findOneAndUpdate({ id }, product, {
        new: true,
      });
      console.log(updatedProduct);
    } catch (error) {
      console.error(error);
    }
  };
}

const products = new ProductManager();

export default products;
