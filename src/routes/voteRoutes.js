import { Router } from "express";
import VoteController from "../controllers/VoteController.js";

const router = new Router();

router.get('/', VoteController.index);
router.post('/', VoteController.create);
router.get('/count/:optionId', VoteController.countByOption)

export default router;
