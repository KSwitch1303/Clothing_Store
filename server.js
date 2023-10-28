const express = require('express');
const app = express();

app.set('view engine', 'ejs');

const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// * connect to mongoDB
const dbURI = 'mongodb+srv://ebimieteimisongo:passwordd@cluster0.lxxplxd.mongodb.net/ghostStore'
mongoose.connect(dbURI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then((result)=>{
    console.log('connected to database');
    app.listen(3000);
})


// * Mongoose models
const Product = require('./models/product')

// * middleware
app.use(express.urlencoded({extended: true}));


// * Link Handlers
app.get('/', (req, res) =>{
    res.render('index')
});

app.get('/add', (req,res)=>{
    res.render('add')
});

app.post('/add', (req,res)=>{
    console.log(req.body);
    const product = new Product(req.body);
    product.save()
    .then((result)=> {
        console.log('saved');
        res.redirect('/')
    })
});

// ! 404
app.use((req,res)=>{
    res.status(404).render('404')
});