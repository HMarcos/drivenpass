import { Request, Response } from "express";
import { UserCreationData } from "../repositories/userRepository.js";
import authService from "../services/authService.js";
import logging from "../utils/logging.js";

export async function signUp(req: Request, res: Response) {
    const user: UserCreationData = req.body;
    await authService.signUp(user);

    console.log(logging.info('User registered successfully'));
    res.sendStatus(201);
}