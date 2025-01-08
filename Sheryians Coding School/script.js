import express from 'express';
const app=express();


app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.use((req,res,next)=>{
    console.log('This is a middleware');
    next();
})

app.get("/",(req,res)=>{
    res.send('Hello World');
}); 

app.get("/error",(req,res,next)=>{
    return next(new Error('Something went wrong'));
});

app.use((errm,req,res,next)=>{
    console.error(errm.stack);
    res.status(500).send('Something broke!');
})

app.listen(3000,()=>{
    console.log('Server is running on port 3000');
});