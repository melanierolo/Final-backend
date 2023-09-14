import express from 'express';
import ProductManager from '../controllers/ProductManager';

const router = express.Router();

router.get('/', (req, res) => {
  ProductManager.getProducts()
    .then((products) => res.json(products))
    .catch((error) => res.status(500).json({ error: 'Internal Server Error' }));
});

router.post('/', (req, res) => {
  const { title, description, price, thumbnailImg, code, stock } = req.body;
  ProductManager.addProduct(
    title,
    description,
    price,
    thumbnailImg,
    code,
    stock
  )
    .then((product) => res.json(product))
    .catch((error) => res.status(500).json({ error: 'Internal Server Error' }));
});

router.get('/:pid', (req, res) => {
  const pid = req.params.pid;
  ProductManager.getProductById(pid);
});

router.put('/:pid', (req, res) => {
  const pid = req.params.pid;
  const updatedFields = req.body;

  ProductManager.updateProducts({ id: pid, ...updatedFields })
    .then((product) => {
      if (product) {
        res.json(product);
      } else {
        res.status(404).json({ error: 'Product not found' });
      }
    })
    .catch((error) => res.status(500).json({ error: 'Internal Server Error' }));
});

router.delete('/:pid', (req, res) => {
  const pid = req.params.pid;

  ProductManager.deleteProductById(pid);
  res.json({ message: 'Product deleted' });
});

export default router;
