import 'dotenv/config';
import app from './src/app.js';
import connectDB from './src/config/db.js';

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        // Connect to MongoDB first
        await connectDB();

        // Start Express server
        app.listen(PORT, () => {
            console.log('');
            console.log('🚀 ================================');
            console.log(`🚀  RentiGO Backend running!`);
            console.log(`🚀  Port     : ${PORT}`);
            console.log(`🚀  API Base : http://localhost:${PORT}/api`);
            console.log(`🚀  Health   : http://localhost:${PORT}/api/health`);
            console.log('🚀 ================================');
            console.log('');
        });
    } catch (error) {
        console.error('💥 [Server] Failed to start:', error.message);
        process.exit(1);
    }
};

startServer();