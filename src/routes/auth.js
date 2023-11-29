import express from 'express';
import AuthManager from '../controllers/authManager.js';

const router = express.Router();

router.post('/', async (req, res) => {
  await AuthManager.handleAuth(req, res);
});

export default router;
