const express = require('express');
const app = express();

// * View engine
app.set('view engine', 'ejs');

const mongoose = require('mongoose');

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
const User = require('./models/user')
const Product = require('./models/product')

// * middleware
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + '/views/public'));


// * Link Handlers
app.get('/', (req, res) =>{
    res.render('index')
});

app.get('/add', (req,res)=>{
    res.render('add')
});

// * POST REQUEST
app.post('/add', (req,res)=>{
    console.log(req.body);
    const product = new Product(req.body);
    product.save()
    .then((result)=> {
        console.log('saved');
        res.redirect('/')
    })
});

app.get('/shop',(req,res) => {
    res.render('shop')
});

app.get('/cart',(req,res) => {
    res.render('cart')
});

app.get('/signup',(req,res) =>{
    res.render('reg')
});

// * POST REQUEST
app.post('/signup',(req,res) =>{
    console.log( req.body);
    const user = new User(req.body);
    user.save()
    .then((result)=>{
        console.log('saved');
        res.redirect('/login')
    });
});

app.get('/login',(req,res) =>{
    res.render('login', {wrongPassord: false})
});

// * POST REQUEST
app.post('/login',async (req,res)=>{
    console.log(req.body);
    try{
        const check = await User.findOne({username: req.body.username})
        console.log(check.password)
        if (check.password == req.body.password){
            res.redirect('/')
        }else{
            res.render('login',{wrongPassord: true})
        }
    }
    catch{
            res.render('login',{wrongPassord: true})
        }
});

// ! 404s
app.use((req,res)=>{
    res.status(404).render('404')
});