require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors')

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("public"));
app.use("/public", express.static("public"));

const authroute = require('./routes/authRoutes');
const staticRoutes = require('./routes/staticRoutes')
const productRoutes = require('./routes/productRoutes')
const orderRoutes = require('./routes/orderRoutes')

const { connectToDB } = require('./database/connection');
const { verifyjwttoken } = require('./services/Authentication');

const PORT = process.env.PORT || 3000;


app.use('/auth', authroute);
app.use('/', staticRoutes)
app.use('/api', productRoutes)
app.use('/sales', orderRoutes)

app.get('/user',verifyjwttoken('token'), (req, res) => {
    if (!req.user) {

        return res.status(401).json({ message: "Unauthorized" });
    }
    return res.status(200).json({ user: req.user });

})


app.listen(PORT, async () => {
    try {
        console.log(`Server is running on http://localhost:${PORT}`)
        await connectToDB(process.env.MONGO_URL);

    } catch (err) {

    }
})

