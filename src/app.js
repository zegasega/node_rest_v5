const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes');
const authRoutes = require('./routes/auth.routes');
const CustomError = require('./utils/customError');

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

app.use((err, req, res, next) => {

    if (err instanceof CustomError) {
        return res.status(err.statusCode).json({
            message: err.message,  
            status: err.statusCode, 
        });
    }
}),

app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

module.exports = app; 