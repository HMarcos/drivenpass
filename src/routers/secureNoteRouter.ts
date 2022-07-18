import { Router } from "express";
import { deleteSecureNote, getSecureNoteById, getSecureNotes, setSecureNote } from "../controllers/secureNoteController.js";
import { validateToken } from "../middlewares/sessionMiddleware.js";
import validateSchema from "../middlewares/validateSchemaMiddleware.js";
import secureNoteSchema from "../schemas/secureNoteSchema.js";

const secureNoteRouter = Router();

secureNoteRouter.post("/secure-notes", validateToken, validateSchema(secureNoteSchema), setSecureNote);
secureNoteRouter.get("/secure-notes", validateToken, getSecureNotes);
secureNoteRouter.get("/secure-notes/:id", validateToken, getSecureNoteById);
secureNoteRouter.delete("/secure-notes/:id", validateToken, deleteSecureNote);

export default secureNoteRouter;