import { Router } from "express";
import { deleteCredential, getCredentialById, getCredentials, setCredential } from "../controllers/credentialController.js";
import { validateToken } from "../middlewares/sessionMiddleware.js";
import validateSchema from "../middlewares/validateSchemaMiddleware.js";
import credentialSchema from "../schemas/credentialSchema.js";

const credentialRouter = Router();

credentialRouter.post("/credentials", validateToken, validateSchema(credentialSchema), setCredential);
credentialRouter.get("/credentials", validateToken, getCredentials);
credentialRouter.get("/credentials/:id", validateToken, getCredentialById);
credentialRouter.delete("/credentials/:id", validateToken, deleteCredential);

export default credentialRouter;