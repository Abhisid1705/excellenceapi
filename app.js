const express=require('express');

const bodyParser=require('body-parser');

const Mongoose=require('mongoose');

const app=express();

app.use(bodyParser.json());//application/json

app.use((req,res,next)=>{
    res.setHeader('Access-control-Allow-Origin','*');
    res.setHeader('Access-control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
    res.setHeader('Access-control-Allow-Headers','Content-Type,Authorization');
    next();
})

const feedRoutes=require('./routes/feed');

//feed/posts/ 
app.use(feedRoutes);
app.use((error,req,res,next)=>{
     const status=error.statusCode;
     const msg=error.message;
     console.log(error)
     res.status(500).json({message:msg});
});

Mongoose.connect(
    'mongodb+srv://abhi:9430259109@cluster0.mxivb.mongodb.net/excellence?retryWrites=true&w=majority',
    {useNewUrlParser: true, useUnifiedTopology: true}
    ).then(result=>{
        console.log('listening on 8080')
        app.listen(8080);
    }).catch(err=>{
        console.log(err);
    })