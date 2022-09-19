import { Request, Response } from "express";
import { RefreshTokenUserUseCase } from "./refreshTokenUserUseCase";



class RefreshTokenUserController{

    async handle(request:Request, response: Response){

        const { refresh_token } = request.body;
        

        const refreshTokenUserUseCase = new RefreshTokenUserUseCase();


        const token = await refreshTokenUserUseCase.excute(refresh_token)


        return response.json(token);

    }

}


export {RefreshTokenUserController}