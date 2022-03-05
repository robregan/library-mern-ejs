const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const indexRouter = require('./routes/index')

const connectDB = require('./config/database')
const MongoStore = require("connect-mongo")
const PORT = process.env.PORT || 3000
require("dotenv").config({ path: "./config/.env" });

//Body Parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts);
app.use(express.static('public'))

connectDB()

// // Setup Sessions - stored in MongoDB
// app.use(
//     session({
//       secret: "keyboard cat",
//       resave: false,
//       saveUninitialized: false,
//       store: new MongoStore({ mongooseConnection: mongoose.connection }),
//     })
//   );


app.use('/' , indexRouter)


app.listen(PORT, () => {console.log(`Server running on port: ${PORT}`)})