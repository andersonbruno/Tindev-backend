import axios from 'axios';
import Dev from '../models/Dev';
import { Request, Response } from 'express';

export default {
    async index(req: Request, res: Response){
        const { user } = req.headers;

        try{
            const loggedDev = await Dev.findById(user);

            if(!loggedDev){
                return res.status(401).json('Logged Dev is undefined');
            }

            const users = await Dev.find({
                $and : [
                    { _id: { $ne : user }},
                    { _id: { $nin : loggedDev.likes }},
                    { _id: { $nin : loggedDev.dislikes }}
                ]
            });
    
            return res.status(200).json(users);
        } catch ( err ) {
            return res.status(401).json('Logged Dev is undefined');
        }
       
    },

    async store(req: Request, res: Response){
        const username = req.body.username;

        const userExists = await Dev.findOne({user: username});

        if(userExists){
            return res.status(200).json(userExists);
        }
        
        try{
            const response = await axios.get(`https://api.github.com/users/${username}`);

            const { name, bio, avatar_url: avatar } = response.data;
    
            const dev = await Dev.create({
                name,
                user: username,
                bio,
                avatar
            })
    
            return res.status(201).json(dev);
        } catch (err) {
            const response = err.response;

            return res.status(response.status).send(response.data);
        }
       
    }
}