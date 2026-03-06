import mongoose from "mongoose";

export async function connectDB(mongourl) {
    if (!mongourl) {
        const err = new Error('MONGODB_URL is missing in .env')
        err.statusCode = 500;
        throw err;
    }

    try {
        await mongoose.connect(mongourl);
        console.log("✅ DB Connected");

        //OPTIONAL BUT HELPFUL LOGS 
        mongoose.connection.on('error', (e) => {
            console.error("❌ MongoDb connection error: ", e.message)
        })

    } catch (er) {
        const err = new Error(`MongoDb connection failed: ${er.message}`);
        err.statusCode = 500;
        throw err;
    }

}