import express from 'express';
import routes from './routes';
import mongoose from 'mongoose';
import cors from 'cors';
import db from './config/database.json';

const server = express();

mongoose.connect(db.connection,{
    useUnifiedTopology: true,
    useNewUrlParser: true
});

server.use(cors());
server.use(express.json());
server.use(routes);

server.listen(3333);