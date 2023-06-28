module.exports = (sequelize, Sequelize) => {
    const Payments = sequelize.define("Payments", {
        P_Method: {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: "Cash"
        },
    });
    return Payments;
}