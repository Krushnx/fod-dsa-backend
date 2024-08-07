const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const cors = require('cors');
const PORT = process.env.PORT || 8000;
const cookieparser = require('cookie-parser')
mongoose.connect(process.env.DB);
const app = express();
const corsOptions ={
    origin:['http://localhost:3000' ,'https://fod-dsa-frontend.vercel.app' , 'https://fod-dsa-frontend-4lb2peucs-krushnxs-projects.vercel.app/' , 'https://fod-do-dsa.web.app' , 'http://192.168.158.154:3000'], 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
    
}
app.use(cors(corsOptions));//set up route
// app.use(cors());//set up route

const db = mongoose.connection;

db.on('error' , (error)=>{console.log(error);});

db.once('open' , ()=>{console.log("Conneced to MongoDB Atlas Successfully");});

app.use(express.json());
app.use(cookieparser());


app.get('/', (req, res) => {res.sendStatus(200)})
app.get('/test', (req, res) => {res.sendStatus(201)})


// const hotelRoutes = require('./routes/hotels');
const challengeRoute = require('./routes/challengeRoute');
const userRoutes = require('./routes/userRoutes')
// const paymentsRouter = require('./routes/payment'); // Import the payments routes
// app.use('/hotels' , hotelRoutes);
app.use('/auth' , userRoutes);
app.use('/challenge' , challengeRoute);
// app.use('/payments', paymentsRouter);

app.listen(PORT, ()=>{
    console.log(`App listed on port http://localhost:8000`);
});
