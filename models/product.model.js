module.exports = (sequelize, Sequelize) => {
    const Products = sequelize.define("Products", {
        P_ID: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            get() {
                return this.getDataValue('P_ID');
            }
        },
        P_Name : {
            type: Sequelize.STRING(64),
            allowNull: false,
            validate:{
                is: `^[A-Za-z]+(?:[\\s-][A-Za-z]+)*$`
            }
        },
        P_Description: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                len: [10, 200]
            }
        },
        P_BasePrice: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        P_SellPrice: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        P_Quantity: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        P_BarCode : {
            type: Sequelize.STRING(64),
            allowNull: false,
        }
    });
    return Products;
}