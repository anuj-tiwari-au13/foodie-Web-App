const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const port = process.env.PORT || 7000

mongoose.connect('mongodb+srv://admin:anj1234@cluster0.8jt9w.mongodb.net/foodie?retryWrites=true&w=majority',

    {       
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: true,
     
    },
    console.log('Database connected...')
);
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//adding the heaader  to over-write cors error that are encountered while using browsers
//giving access to all requests 
app.use((req, res, next) => {
    res.header('Access-control-Allow-Origin', "*");
    res.header(
        'Access-control-Allow-Origin',
        "Origin,X-Requested-With,Content-Type,Accept,Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.header('Acces-Control-Allow-Methods', 'PUT,POST,PATCH,DELETE,GET');
        return res.status(200).json({});

    }
    next();
});



const menuRoutes = require('./api/routes/menu');
app.use('/menu', menuRoutes);

const orderRoutes = require('./api/routes/order');
app.use('/orders', orderRoutes);

const userRoutes = require('./api/routes/user');
app.use("/user", userRoutes);


app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status=404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});
