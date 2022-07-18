import { Router } from "express";
import authRouter from "./authRouter.js";
import cardRouter from "./cardRouter.js";
import credentialRouter from "./credentialRouter.js";
import secureNoteRouter from "./secureNoteRouter.js";
import wiFiPasswordRouter from "./wiFiPasswordRouter.js";

const router = Router();

router.use(authRouter);
router.use(secureNoteRouter);
router.use(credentialRouter);
router.use(cardRouter);
router.use(wiFiPasswordRouter);

export default router;