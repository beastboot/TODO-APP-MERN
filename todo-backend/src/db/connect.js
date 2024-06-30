// external modules import
const mongoose = require("mongoose");

const connectionString ="mongodb+srv://roshankumar86788:rk94511@cluster0.o7b8byz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Log the MongoDB URI to check if it's being read correctly (Optional for debugging)
console.log("MongoDB URI:", connectionString);

const connectDatabase = async () => {
  // Check if connectionString is defined
  if (!connectionString) {
    console.error(
      "MongoDB URI is not defined. Check your .env file or environment variables."
    );
    process.exit(1); // Exit the process with an error code
  }

  try {
    await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex: true, // No longer needed in mongoose 6.x and above
      // useFindAndModify: false, // No longer needed in mongoose 6.x and above
    });
    console.log("Connected to MongoDB database successfully.");
  } catch (error) {
    console.log("Error connecting to MongoDB: ", error.message);
    process.exit(1); // Exit the process with an error code
  }

  // Optional: Handle deprecation warning for strictQuery
  mongoose.set("strictQuery", false); // To address the Mongoose deprecation warning
};

module.exports = connectDatabase;
