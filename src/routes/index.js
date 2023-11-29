import express from 'express';
import {
  renderIndex,
  renderQuienesSomos,
  renderAllProducts,
  renderRegister,
  renderLogin,
} from '../controllers/index.js';
import { apiBaseUrl } from '../config.js';
import ProductManager from '../controllers/ProductManager.js';

const router = express.Router();

router.get('/', renderIndex);

router.get('/quienesSomos', renderQuienesSomos);

// In your route handler
router.get('/productos', renderAllProducts);

router.get('/registro', renderRegister);

router.get('/iniciarSesion', renderLogin);

export default router;
