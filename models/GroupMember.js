const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class GroupMember extends Model { }

GroupMember.init({
    // define columns
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    group_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: 'group',
            key: 'id',
        }
    },
    user_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: 'user',
            key: 'id',
        }
    },
    approved: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
}, {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'groupmember',
});

module.exports = GroupMember