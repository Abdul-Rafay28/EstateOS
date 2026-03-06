import 'dotenv/config';
import { connectDB } from './src/config/db.js';
import app from './src/app.js';


const startServer = async () => {
    try {
        await connectDB(process.env.MONGODB_URL);

        app.listen(process.env.PORT, () => {
            console.log(`🚀Server running on PORT: ${process.env.PORT}`);
        })
    } catch (err) {
        console.error("❌ StartUp failed: ", err.message)
    }
}

startServer();