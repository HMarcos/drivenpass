import { Router } from "express";
import authRouter from "./authRouter.js";
import credentialRouter from "./credentialRouter.js";
import secureNoteRouter from "./secureNoteRouter.js";

const router = Router();

router.use(authRouter);
router.use(secureNoteRouter);
router.use(credentialRouter);

export default router;