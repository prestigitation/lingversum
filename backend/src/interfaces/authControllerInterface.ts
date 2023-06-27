import { Request, Response } from "express";

type token = string;

export default interface authControllerInterface {
    login(request: Request, response: Response): token;
    register(request: Request, response: Response): Response;
}