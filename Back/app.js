const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const url = "mongodb+srv://mehdi:mehdi@api-react.cbsgm.mongodb.net/api-react?retryWrites=true&w=majority";
//const url = mongoose.connect('mongodb://localhost/scan',{useNewUrlParser: true});


const cors = require('cors');

const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');

 mongoose.connect(
     url,
     { useNewUrlParser: true, useUnifiedTopology: true })
   .then(() => console.log('Connexion à MongoDB réussie !'))
   .catch((error) => console.log('Connexion à MongoDB échouée ! ', error));

   app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
/*
app.use(cors());
*/
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.use('/api/category', categoryRoutes);
app.use('/api/product', productRoutes);

module.exports = app;