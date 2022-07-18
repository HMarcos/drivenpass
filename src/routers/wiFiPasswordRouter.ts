import { Router } from "express";
import { deleteWiFiPassword, getWiFiPasswordById, getWiFiPasswords, setWiFiPassword } from "../controllers/wiFiPasswordController.js";
import { validateToken } from "../middlewares/sessionMiddleware.js";
import validateSchema from "../middlewares/validateSchemaMiddleware.js";
import wiFiPasswordSchema from "../schemas/wiFiPasswordSchema.js";

const wiFiPasswordRouter = Router();

wiFiPasswordRouter.post("/wi-fi-passwords", validateToken, validateSchema(wiFiPasswordSchema), setWiFiPassword);
wiFiPasswordRouter.get("/wi-fi-passwords", validateToken, getWiFiPasswords);
wiFiPasswordRouter.get("/wi-fi-passwords/:id", validateToken, getWiFiPasswordById);
wiFiPasswordRouter.delete("/wi-fi-passwords/:id", validateToken, deleteWiFiPassword);

export default wiFiPasswordRouter;