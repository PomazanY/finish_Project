import mongoose from "mongoose"

const { DATABASE_URI } = process.env;

const connectDatabase = async () => {
    try {
        await mongoose.connect(DATABASE_URI);
        console.log("Successfully connect to database");
        
    }
    catch (error) {
        console.log(`Error connect to database ${error.message}`);
        throw error;

    }
}
export default connectDatabase;