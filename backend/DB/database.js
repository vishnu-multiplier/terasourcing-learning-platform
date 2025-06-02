import mongoose from "mongoose";

const URL = "mongodb+srv://vishnu:lJ8NLkeyglYd4KYL@terasourcing.rzhn16l.mongodb.net/?retryWrites=true&w=majority&appName=terasourcing"

const connectToDatabase = async() =>  {
  try {
    await mongoose.connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit the process with failure
  }
}

export default connectToDatabase;