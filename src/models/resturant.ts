// src/models/Restaurant.ts

import mongoose, { Schema, Document } from 'mongoose';

export interface IRestaurant extends Document {
  name: string;
  address: string;
  cuisineType: string;
  location: {
    type: string;
    coordinates: number[];
  };
}

const restaurantSchema = new Schema<IRestaurant>({
  name: { type: String, required: true },
  address: { type: String, required: true },
  cuisineType: { type: String, required: true },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
});

export const Restaurant = mongoose.model<IRestaurant>('Restaurant', restaurantSchema);
