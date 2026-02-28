import express from 'express';
import { requireAuth } from '@clerk/express';
import syncUser from '../middleware/syncUser.js';
import requireRole from '../middleware/roleMiddleware.js';
import {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
} from '../controllers/productController.js';

const router = express.Router();

// GET /api/products – public (no auth needed)
router.get('/', getProducts);

// GET /api/products/:id – public
router.get('/:id', getProductById);

// POST /api/products – any authenticated user can list
router.post('/', requireAuth(), syncUser, createProduct);

// PUT /api/products/:id – owner (verified in controller)
router.put('/:id', requireAuth(), syncUser, updateProduct);

// DELETE /api/products/:id – owner or admin (verified in controller)
router.delete('/:id', requireAuth(), syncUser, deleteProduct);

export default router;
