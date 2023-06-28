module.exports = (sequelize, Sequelize) => {
    const Category = sequelize.define("Category", {
        Cat_Name : {
            type: Sequelize.STRING(64),
            allowNull: false,
            primaryKey: true,
            validate:{
                is: `^[A-Za-z]+(?:[\\s-][A-Za-z]+)*$`
            }
        },
        Cat_Description: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                len: [10, 200] // validates that the address is between 10 and 200 characters long
            }
        }
    });
    return Category;
}