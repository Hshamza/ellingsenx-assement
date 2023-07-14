# ellingsenx-assement


Use this command to run the project **npx ts-node server.ts**

For Testing use the following commands
  curl -X POST \
  -H "Content-Type: application/json" \
  -d '{
    "email": "hamza@yopmail.com",
    "password": "password1223"
  }' \
  http://localhost:3000/api/auth/login



      curl -X POST \
  -H "Content-Type: application/json" \
  -d '{
    "name": "MY REST",
  "address": "MY ADDRESS",
  "cuisineType": "Restaurant Cuisine Type",
  "latitude": 40.7128,
  "longitude": -74.0060
  }' \
  http://localhost:3000/api/resturant/store-restaurant-data
