import express from 'express';
import routes from './routes';
import mongoose from 'mongoose';
import cors from 'cors';
import db from './config/database.json';
import dotenv from 'dotenv';

dotenv.config({
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
});

const connection = process.env.CONNECTION || '';

const server = express();

mongoose.connect(connection,{
    useUnifiedTopology: true,
    useNewUrlParser: true
});

server.use(cors());
server.use(express.json());
server.use(routes);

server.listen(process.env.PORT || 3333);

export default server;