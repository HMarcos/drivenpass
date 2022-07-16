import { Router } from "express";

const authRouter = Router();

authRouter.post('/sign-up', (req, res) => {
    console.log('Sign Up!');
    res.sendStatus(201);
})
export default authRouter;