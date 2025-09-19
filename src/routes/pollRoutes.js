import { Router } from 'express';
import PollController from '../controllers/PollController.js'

const router = new Router();

router.get('/', PollController.index);
router.post('/', PollController.create);
router.get('/:id', PollController.show);
router.put('/:id', PollController.update);
router.delete('/:id', PollController.delete);

export default router;
