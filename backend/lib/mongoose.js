import mongoose from "mongoose";

// Ensure environment variables are loaded from .env file (Next.js does this automatically)
if (typeof window === "undefined") {
  require('dotenv').config();  // Only run on the server-side
}

export function mongooseConnect() {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection.asPromise();
  } else {
    const uri = process.env.MONGODB_URI; // Make sure .env file is set up correctly
    if (!uri) {
      throw new Error('MONGODB_URI is not defined');
    }
    return mongoose.connect(uri);
  }
}
