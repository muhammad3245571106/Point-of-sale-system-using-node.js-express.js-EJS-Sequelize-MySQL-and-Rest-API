module.exports = (sequelize, Sequelize) => {
    const Customers = sequelize.define("Customer", {
        C_ID: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            // get() {
            //     return 'myPrefix' + this.getDataValue('CustomerID').toString().padStart(6, '0');
            // }
        },
        C_Name : {
            type: Sequelize.STRING(64),
            allowNull: false,
            validate:{
                is: `^[A-Za-z]+(?:[\\s-][A-Za-z]+)*$`
            }
        },
        C_Email : {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            validate:{
                isEmail: true,
            }
        },
        C_Phone: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            validate: {
                is: /^\+[1-9]\d{1,14}$/ // validates that the phone number is in the international format +[country code][phone number]
            }
        },
        C_Address: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                len: [10, 200] // validates that the address is between 10 and 200 characters long
            }
        },
        C_Password: {
            type: Sequelize.STRING,
            allowNull: false           
        },
        C_Username: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
        C_Status: {
            type: Sequelize.ENUM('active', 'inactive'),
            allowNull: false,
            defaultValue: 'inactive'
        }
    });
    return Customers;
}