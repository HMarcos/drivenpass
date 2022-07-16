import { Request, Response } from "express";
import { UserCreationData } from "../repositories/userRepository.js";
import authService from "../services/authService.js";

export async function signUp(req: Request, res: Response) {
    const user: UserCreationData = req.body;
    authService.signUp(user);
    
    console.log('Sign Up!');
    res.sendStatus(201);
}