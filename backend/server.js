import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import config from './config.js';
import productRouter from "./routers/productRouter.js";
import userRouter from "./routers/userRouter.js";
import orderRouter from "./routers/orderRouter.js";
import uploadRouter from "./routers/uploadRouter.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use(express.urlencoded({extended: true}));

mongoose.connect(config.MONGODB_URL || 'mongodb://localhost/ella-crafts', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

app.use('/api/uploads', uploadRouter);

app.use('/api/users', userRouter);

app.use('/api/products', productRouter)

app.use('/api/orders', orderRouter);

app.get('/api/config/paypal', (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
});

const __dirname = path.resolve();

app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.use(express.static(path.join(__dirname, '/frontend/build')));

app.get('*', (req, res) =>
 res.sendFile(path.join(__dirname, '/frontend/build/index.html')));

app.get("/", (req, res) => {
    res.send("server is ready");
});

app.use((err, req, res, next) => {
    res.status(500).send({message: err.message});
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`server at http://0.0.0.0:${PORT}`);
});