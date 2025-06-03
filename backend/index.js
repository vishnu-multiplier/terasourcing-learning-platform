import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import morgan from "morgan";

import router from './routes/router.js';
import connectToDatabase from './DB/database.js';
import userRoutes from './routes/userRoutes.js';
import courseRoutes from './routes/courseRoutes.js' 
import sessionRoutes from './routes/sessionRoutes.js'



dotenv.config();



const app = express()
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));



connectToDatabase();

app.use('/',router);
app.use('/api/users', userRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/sessions', sessionRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
