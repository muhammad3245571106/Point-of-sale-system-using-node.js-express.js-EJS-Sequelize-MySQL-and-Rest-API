module.exports = (sequelize, Sequelize) => {
    const Orders = sequelize.define("Orders", {
        O_ID: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            // get() {
            //     return 'myPrefix' + this.getDataValue('O_ID').toString().padStart(6, '0');
            // }
        },
        OrderDate: {
            type: Sequelize.DATEONLY,
            defaultValue: Sequelize.NOW
        },
        OrderTotal: {
            type: Sequelize.FLOAT,
            allowNull: false
        },
        additionalDiscount: {
            type: Sequelize.FLOAT,
            defaultValue: 0
        }
    });
    return Orders;
}