const app = require('./app');
const sequelize = require('./config/database');

const PORT = process.env.PORT || 3000;

async function startServer() {
    try {
        // Database bağlantısı
        await sequelize.authenticate();
        console.log('Database connection has been established successfully.');
        
        // Database senkronizasyonu
        await sequelize.sync();
        console.log('Database synchronized successfully.');

        // Server'ı başlat
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Unable to start server:', error);
        process.exit(1);
    }
}

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing HTTP server');
    sequelize.close().then(() => {
        console.log('Database connection closed');
        process.exit(0);
    });
});

process.on('SIGINT', () => {
    console.log('SIGINT signal received: closing HTTP server');
    sequelize.close().then(() => {
        console.log('Database connection closed');
        process.exit(0);
    });
});

startServer(); 