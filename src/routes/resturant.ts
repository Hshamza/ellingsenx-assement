// src/routes/restaurantRoutes.ts

import express from 'express';
import {
  getNearbyRestaurants,
  getAllRestaurants,
  deleteRestaurantById,
  storeRestaurantData
} from '../controllers/resturantController';

const router = express.Router();

router.post('/store-restaurant-data', storeRestaurantData);
router.get('/get-nearby-restaurants', getNearbyRestaurants);
router.get('/get-all-restaurants', getAllRestaurants);
router.delete('/delete-restaurant/:id', deleteRestaurantById);

export default router;
