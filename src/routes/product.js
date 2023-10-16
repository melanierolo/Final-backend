import express from 'express';
import ProductManager from '../controllers/ProductManager.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { limit, page, sort, query } = req.query;
    const result = await ProductManager.getProducts(limit, page, sort, query);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/', async (req, res) => {
  const { title, description, price, thumbnailImg, code, stock } = req.body;
  await ProductManager.addProduct(
    title,
    description,
    price,
    thumbnailImg,
    code,
    stock
  );
  res.json({ message: 'Product added successfully' });
});

router.get('/:pid', async (req, res) => {
  const pid = req.params.pid;
  await ProductManager.getProductById(pid);
  res.send();
});

router.put('/:pid', async (req, res) => {
  const pid = req.params.pid;
  const updatedFields = req.body;

  await ProductManager.updateProducts({ id: pid, ...updatedFields });
  res.json({ message: 'Product updated successfully' });
});

router.delete('/:pid', async (req, res) => {
  const pid = req.params.pid;

  await ProductManager.deleteProductById(pid);
  res.json({ message: 'Product deleted successfully' });
});

export default router;
