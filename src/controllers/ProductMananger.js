import { promises as fs } from 'fs';

class ProductManager {
  constructor() {
    this.patch = './src/models/products.json';
    this.products = [];
  }
  // automatic id
  static id = 0;

  addProduct = async (title, description, price, thumbnailImg, code, stock) => {
    // automatic id
    ProductManager.id += 1;
    // Create an instance of the class inside the method like this:
    let newProduct = {
      title,
      description,
      price,
      thumbnailImg,
      code,
      stock,
      id: ProductManager.id,
    };
    this.products.push(newProduct);
    console.log(newProduct);
    //access the 'path' property of the new instance:
    await fs.writeFile(this.patch, JSON.stringify(this.products));
  };

  readProducts = async () => {
    let result = await fs.readFile(this.patch, 'utf-8');
    return JSON.parse(result);
  };

  getProducts = async () => {
    let response = await this.readProducts();
    return console.log(response);
  };

  getProductById = async (id) => {
    let response = await this.readProducts();
    const isProductExist = response.find((product) => product.id === id);
    return isProductExist ? console.log('Exists') : console.log('Not found');
  };
  deleteProductById = async (id) => {
    let response = await this.readProducts();
    const productFilter = response.filter((product) => product.id !== id);
    await fs.writeFile(this.patch, JSON.stringify(productFilter));
    console.log('product deleted');
  };

  updateProducts = async ({ id, ...product }) => {
    await this.deleteProductById(id);
    let productOld = await this.readProducts();
    let productsEdit = [{ ...product, id }, ...productOld];
    await fs.writeFile(this.patch, JSON.stringify(productsEdit));
  };
}

const products = new ProductManager();

export default ProductManager;
