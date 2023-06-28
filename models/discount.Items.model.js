module.exports = (sequelize, Sequelize) => {
    const discountItems = sequelize.define("discountItems", {
        Percentage: {
            type: Sequelize.INTEGER,
            allowNull: false,
            get() {
                return this.getDataValue('Percentage');
            }
        }
    });
    return discountItems;
};