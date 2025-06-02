import express from 'express';
import cors from 'cors';

import router from './routes/router.js';
import connectToDatabase from './DB/database.js';



const app = express()
const port = 3000

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


connectToDatabase();

app.use('/',router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
