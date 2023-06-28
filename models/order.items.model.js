module.exports = (sequelize, Sequelize) => {
    const OrdersItems = sequelize.define("OrderItems", {
        OI_BasePrice: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        OI_SellPrice: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        OI_Quantity: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
    });
    return OrdersItems;
}