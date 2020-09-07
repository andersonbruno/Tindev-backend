import Dev from '../models/Dev';
import { Request, Response } from 'express';

export default {

    async store(req: Request, res: Response) {    
        const { user } = req.headers;
        const { devId } = req.params;

        const loggedDev = await Dev.findById(user);
        const targetDev = await Dev.findById(devId);

        if(!loggedDev){
            return res.status(400).json({ erro: 'Logged Dev is undefined'});
        }

        if(!targetDev){
            return res.status(400).json({ erro: 'Dev not exists '});
        }

        if(targetDev.likes.includes(loggedDev._id)){
            console.log('Deu match');
        }

        loggedDev.likes.push(targetDev._id);

        await loggedDev.save();

        return res.json(loggedDev);
    }

}