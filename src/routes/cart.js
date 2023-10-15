import express from 'express';
import CartManager from '../controllers/CartManager';

const router = express.Router();

router.post('/', (req, res) => {
  const newCart = req.body;
  CartManager.createCart(newCart)
    .then((cart) => res.json(cart))
    .catch((error) => res.status(500).json({ error: 'Internal Server Error' }));
});

router.get('/:cid', (req, res) => {
  const cid = req.params.cid;
  CartManager.getCartById(cid)
    .then((cart) => {
      if (cart) {
        res.json(cart);
      } else {
        res.status(404).json({ error: 'Cart not found' });
      }
    })
    .catch((error) => res.status(500).json({ error: 'Internal Server Error' }));
});

router.post('/:cid/product/:pid', (req, res) => {
  const cid = req.params.cid;
  const pid = req.params.pid;
  const quantity = req.body.quantity || 1;

  CartManager.addProductToCart(cid, pid, quantity)
    .then((cart) => {
      if (cart) {
        res.json(cart);
      } else {
        res.status(404).json({ error: 'Cart not found' });
      }
    })
    .catch((error) => res.status(500).json({ error: 'Internal Server Error' }));
});

export default router;
