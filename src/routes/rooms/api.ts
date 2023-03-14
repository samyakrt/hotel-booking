import { Router} from 'express';
import fetchRooms from './fetch-rooms';

const router = Router();

router.get('/',fetchRooms);

export default router;
