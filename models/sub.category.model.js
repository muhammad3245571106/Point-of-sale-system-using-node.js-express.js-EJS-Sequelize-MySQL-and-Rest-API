module.exports = (sequelize, Sequelize) => {
    const SubCategory = sequelize.define("SubCategory", {
        SubCat_Name : {
            type: Sequelize.STRING(64),
            allowNull: false,
            primaryKey: true,
            validate:{
                is: `^[A-Za-z]+(?:[\\s-][A-Za-z]+)*$`
            }
        },
        SubCat_Description: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                len: [10, 200] // validates that the address is between 10 and 200 characters long
            }
        }
    });
    return SubCategory;
}