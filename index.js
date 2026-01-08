require('dotenv').config();
const express = require('express');
const path = require('path');
const URL = require('./models/url');
const cookieParser = require('cookie-parser');
const {restrictToLoggedinUserOnly,checkAuth} = require('./middlewares/auth');
const connectMongoDB = require('./config/connection');

const staticRouter = require('./routes/staticRouter');
const urlRoutes = require('./routes/url');
const userRoutes = require('./routes/user');


const app = express();
const port = process.env.PORT || 8000;

connectMongoDB();

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());



app.use("/url", restrictToLoggedinUserOnly, urlRoutes);
app.use('/user', userRoutes);
app.use('/', checkAuth, staticRouter);

app.get("/url/:shortId", async (req, res) => {
    const shortId = req.params.shortId;
    const urlEntry=await URL.findOneAndUpdate(
        { shortId: shortId },
        { $push: { visitHistory: { timestamp: Date.now() } } }
    );

    res.redirect(urlEntry.redirectUrl);
});


app.listen(port,(req,res)=>{
    console.log(`Server is running on port ${port}`);
})