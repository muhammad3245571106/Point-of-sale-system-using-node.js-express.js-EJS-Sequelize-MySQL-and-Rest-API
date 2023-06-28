const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const indexRoutes = require("./routes/index.routes")
const db = require("./models/index.model.js");
var corsOptions = {
  origin: "http://localhost:3000"
};
app.use(cors(corsOptions));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("public"))
app.set("view engine", "ejs")
db.sequelize.sync({force: false}).then(() => {
  console.log('Database connected successfully!');
}).catch((error) => {
  console.error('Unable to connect to the database: ', error);
});
app.use('/',  indexRoutes);
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
}
);