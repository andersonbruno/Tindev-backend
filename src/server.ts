import express from 'express';
import routes from './routes';
import mongoose from 'mongoose';
import cors from 'cors';

const server = express();

mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0-87u19.mongodb.net/omnistack8?retryWrites=true&w=majority',{
    useUnifiedTopology: true,
    useNewUrlParser: true
});

server.use(cors());
server.use(express.json());
server.use(routes);

server.listen(3333);