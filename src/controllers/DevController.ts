import axios from 'axios';
import Dev from '../models/Dev';
import { Request, Response } from 'express';

export default {
    async index(req: Request, res: Response){
        const { user } = req.headers;

        const loggedDev = await Dev.findById(user);

        console.log(loggedDev   );

        if(loggedDev == null){
            return res.json('Logged Dev is undefined');
        }

        const users = await Dev.find({
            $and : [
                { _id: { $ne : user }},
                { _id: { $nin : loggedDev.likes }},
                { _id: { $nin : loggedDev.dislikes }}
            ]
        });

        return res.json(users);
    },

    async store(req: Request, res: Response){
        const username = req.body.username;

        const userExists = await Dev.findOne({user: username});

        if(userExists){
            return res.json(userExists);
        }

        const response = await axios.get(`https://api.github.com/users/${username}`);

        const { name, bio, avatar_url: avatar } = response.data;

        const dev = await Dev.create({
            name,
            user: username,
            bio,
            avatar
        })

        return res.json(dev);
    }
}