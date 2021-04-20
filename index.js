const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const productRouter = require('./routes/products.route');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/products', productRouter)

//connect to db with mongoose
mongoose.connect('mongodb://localhost/e-commerce', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(() => {
    console.log("database connected")
});

app.listen(process.env.PORT || 5000, () => {
    console.log(`application start at ${process.env.PORT || 5000}`)
})
