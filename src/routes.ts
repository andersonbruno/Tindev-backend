import express from 'express';
import DevController from './controllers/DevController';
import DislikeController from './controllers/DislikeController';
import LikeController from './controllers/LikeController';

const routes = express.Router();

routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store);
routes.post('/devs/:devId/dislikes', DislikeController.store);
routes.post('/devs/:devId/likes', LikeController.store);

export default routes;
