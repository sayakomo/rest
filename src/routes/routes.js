import express from "express";
import { komo, getType } from "../controllers/userControllers.js";

const router = express.Router();

router.get('/', komo);
router.put('/', getType);

export default router;