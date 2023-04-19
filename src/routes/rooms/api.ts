import { Router} from 'express';
import fetchRoom from './fetch-room';
import fetchRooms from './fetch-rooms';

const router = Router();

router.get('/',fetchRooms);
router.get('/:roomId',fetchRoom);

export default router;
