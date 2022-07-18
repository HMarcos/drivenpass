import { Router } from "express";
import { deleteCard, getCardById, getCards, setCard } from "../controllers/cardController.js";
import { validateToken } from "../middlewares/sessionMiddleware.js";
import validateSchema from "../middlewares/validateSchemaMiddleware.js";
import cardSchema from "../schemas/cardSchema.js";

const cardRouter = Router();

cardRouter.post("/cards", validateToken, validateSchema(cardSchema), setCard);
cardRouter.get("/cards", validateToken, getCards);
cardRouter.get("/cards/:id", validateToken, getCardById);
cardRouter.delete("/cards/:id", validateToken, deleteCard);

export default cardRouter;