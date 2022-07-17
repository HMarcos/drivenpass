import { Router } from "express";
import { getCredentials, setCredential } from "../controllers/credentialController.js";
import { validateToken } from "../middlewares/sessionMiddleware.js";
import validateSchema from "../middlewares/validateSchemaMiddleware.js";
import credentialSchema from "../schemas/credentialSchema.js";

const credentialRouter = Router();

credentialRouter.use(validateToken);
credentialRouter.post("/credentials", validateSchema(credentialSchema), setCredential);
credentialRouter.get("/credentials", getCredentials);
export default credentialRouter;