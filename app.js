import express from 'express';
import authRouter from './src/routes/auth.js';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path'

if (process.env.NODE_ENV === 'local') {
    dotenv.config({ path: path.join(path.resolve(), 'src/config/.env.local') })
} else if (process.env.NODE_ENV === 'prod') {
    dotenv.config({ path: path.join(path.resolve(), 'src/config/.env.prod') })
} 

const app = express();
app.use(express.json());

app.use('/auth', authRouter);
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send("ok");
});

app.listen(3000, function(){
    console.log("server has started on port 3000")
})