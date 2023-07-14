// src/controllers/restaurantController.ts

import { Request, Response } from 'express';
import { Restaurant, IRestaurant } from '../models/resturant';

// Store Restaurant Data
export const storeRestaurantData = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, address, cuisineType, latitude, longitude } = req.body;

    // Create a new restaurant document and save it to the database
    const newRestaurant = new Restaurant({
      name,
      address,
      cuisineType,
      location: {
        type: 'Point',
        coordinates: [Number(longitude), Number(latitude)],
      },
    });

    await newRestaurant.save();

    res.json({ message: 'Restaurant data stored successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while storing restaurant data.' });
  }
};


// Get nearby restaurants
export const getNearbyRestaurants = async (req: Request, res: Response): Promise<void> => {
  try {
    const { latitude, longitude, radius } = req.query;

    // Perform a geospatial query to find nearby restaurants
    const restaurants: IRestaurant[] = await Restaurant.find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [Number(longitude), Number(latitude)],
          },
          $maxDistance: parseInt(radius as string, 10),
        },
      },
    });

    res.json(restaurants);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching nearby restaurants.' });
  }
};

// Get all restaurants
export const getAllRestaurants = async (req: Request, res: Response): Promise<void> => {
  try {
    const restaurants: IRestaurant[] = await Restaurant.find();
    res.json(restaurants);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching all restaurants.' });
  }
};

// Delete a restaurant by ID
export const deleteRestaurantById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    await Restaurant.findByIdAndDelete(id);
    res.json({ message: 'Restaurant deleted successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while deleting the restaurant.' });
  }
};
