const express = require('express');
const app = express();
const dotenv=require("dotenv");
dotenv.config();
const configViewEngine = require("./app/configs/viewEngine");
const initWebRoute = require('./app/router/userRouter');
var session = require('express-session')
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT;


app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));
const getUser = async (req, res, next) => {
  res.locals.user = req.session.user;
  console.log(res.locals);
  next();
};
app.use(getUser);
// Use category router
initWebRoute(app);

// Configure view engine
configViewEngine(app);

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
