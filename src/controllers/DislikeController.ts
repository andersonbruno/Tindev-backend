import Dev from '../models/Dev';
import { Response, Request } from 'express';

export default {

    async store(req: Request, res: Response) {
        const { user } = req.headers;
        const { devId } = req.params;

        try{
            const loggedDev = await Dev.findById(user);
            const targetDev = await Dev.findById(devId);

            if(!loggedDev){
                return res.status(400).json({ erro: 'Logged Dev is undefined'});
            }
    
            if(!targetDev){
                return res.status(400).json({ erro: 'Dev not exists '});
            }
    
            loggedDev.dislikes.push(targetDev._id);
    
            await loggedDev.save();
    
            return res.json(loggedDev);
        } catch ( err ) {
            return res.status(400).json({ erro: 'Error while trying to like user, please try again'});
        }

        
    }

}