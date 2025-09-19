import { Router } from 'express';
import OptionController from '../controllers/OptionController.js';

const router = new Router();

router.get('/', OptionController.index);
router.post('/', OptionController.create);
router.get('/:id', OptionController.show);
router.put('/:id', OptionController.update);
router.delete('/:id', OptionController.delete);

export default router;
