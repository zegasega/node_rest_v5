const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user.model');

const Post = sequelize.define('Post', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    }
}, {
    timestamps: true
});

// Define associations
Post.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Post, { foreignKey: 'userId' });

module.exports = Post; 