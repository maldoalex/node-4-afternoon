const express = require("express");
const app = express();
const session = require("express-session");
const swagController = require("./controllers/swagController");
const checkForSession = require("./middlewares/checkForSession");
const authController = require("./controllers/authController");
const cartController = require("./controllers/cartController");
const searchController = require("./controllers/searchController");

require("dotenv").config(); //gives access to process.env

let { SERVER_PORT, SESSION_SECRET } = process.env;

app.use(express.json()); //gives access to req.body

//middleware
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  })
);
app.use(checkForSession);
app.use(express.static(`${__dirname}/../build`));

//endpoints auth
app.post("/api/login", authController.login);
app.post("/api/register", authController.register);
app.post("/api/signout", authController.signout);
app.get("/api/user", authController.getUser);

//endpoints swag
app.get("/api/swag", swagController.read);

//endpoints cart
app.post("/api/cart/checkout", cartController.checkout);
app.post("/api/cart/:id", cartController.add);
app.delete("/api/cart/:id", cartController.delete);

//endpoints search
app.get("/api/search", searchController.search);

app.listen(SERVER_PORT, () => {
  console.log(`listening on port ${SERVER_PORT}`);
});
