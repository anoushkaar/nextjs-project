import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number; // `isConnected?: number` means the property `isConnected` is optional and, if present, must be a number.
};

const connection: ConnectionObject = {};

async function dbConnect(): Promise<void> {
  if (connection.isConnected) {
    console.log("already connected to database.");
    return;
  }
  try {
    const db = await mongoose.connect(process.env.MONGODB_URL || "", {});

    connection.isConnected = db.connections[0].readyState;
    console.log(db);
    console.log(db.connections);
    console.log("db connected successfully");
  } catch (error) {
    console.log("db connected failed", error);
    process.exit(1);
  }
}

export default dbConnect;
