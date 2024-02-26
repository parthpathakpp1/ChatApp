import express from 'express'
import dotenv from 'dotenv'
import authRoutes from './routes/authRoutes.js'
import connectDB from './db/db.js';
import messageRoutes from './routes/messageRoutes.js'
import userRoutes from './routes/userRoutes.js'
import cookieParser from 'cookie-parser';

const app = express();

//middlewares 
dotenv.config();
app.use(express.json());
app.use(cookieParser());

// app.get('/',(req,res) => {
//     res.send('Hello Backend Server has started ! ');
// });
app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);
app.use("/api/users",userRoutes);

const PORT = process.env.PORT;
app.listen(PORT ,() => {
    connectDB();
    console.log(`Server started at PORT NO ${PORT}`);
})