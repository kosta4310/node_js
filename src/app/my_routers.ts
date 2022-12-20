import { Router } from './Router';
import http from 'node:http';
import * as controllers from './controllers';

export const router = new Router();
router.get('/api/users', controllers.getUsers);

router.post('/api/users', controllers.createPost);
