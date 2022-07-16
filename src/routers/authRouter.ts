import { Router } from "express";
import validateSchema from "../middlewares/validateSchemaMiddleware.js";
import signUpSchema from "../schemas/signUpSchema.js";

const authRouter = Router();

authRouter.post('/sign-up', validateSchema(signUpSchema), (req, res) => {
    console.log('Sign Up!');
    res.sendStatus(201);
});

export default authRouter;