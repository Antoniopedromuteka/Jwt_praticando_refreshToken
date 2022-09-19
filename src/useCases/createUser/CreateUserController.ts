import { Request, Response } from "express";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";




class CreateUserController{

    async handle(req:Request, res :Response){

        const {username, name, password} = req.body;

        const createUserUseCase = new CreateUserUseCase();

        const user = await createUserUseCase.execute({
            name, 
            password,
            username
        });


        return res.json(user);
    }
}


export {CreateUserController};