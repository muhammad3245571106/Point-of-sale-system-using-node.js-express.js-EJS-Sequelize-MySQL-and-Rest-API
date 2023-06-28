module.exports = (sequelize, Sequelize) => {
    const Discount = sequelize.define("Discount", {
        D_ID: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            get() {
                return this.getDataValue('D_ID');
            }
        },
        StartDate: {
            type: Sequelize.DATEONLY,
            defaultValue: Sequelize.NOW
        },
        EndDate: {
            type: Sequelize.DATEONLY,
            defaultValue: Sequelize.NOW
        }
    });
    return Discount;
}