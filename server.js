const express = require('express');
const app = express();
const PORT = 3000
const expressLayouts = require('express-ejs-layouts');
const indexRouter = require('./routes/index')


app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts);
app.use(express.static('public'))



app.use('/' , indexRouter)


app.listen(PORT, () => {console.log(`Server running on port: ${PORT}`)})