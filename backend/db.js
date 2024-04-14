const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(
      "mongodb+srv://mohanty4raj:lpuZjUPEGmGlBPFy@cluster0.fiaafld.mongodb.net/FoodApp?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("Connected to MongoDB");

    // Fetch data from the food_items and food_category collections using aggregation
    const [foodItemsData, foodCategoryData] = await Promise.all([
      mongoose.connection.db.collection('food_items').find({}).toArray(),
      mongoose.connection.db.collection('foodCategory').find({}).toArray()
    ]);

    global.food_items = foodItemsData;
    global.foodCategory = foodCategoryData;

    console.log(global.food_items);
    console.log(global.foodCategory);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

module.exports = connectDB;
