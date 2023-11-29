import express from 'express';
import UserManager from '../controllers/userManager.js';

const router = express.Router();

router.post('/', async (req, res) => {
  await UserManager.createUser(req, res);
});

export default router;
