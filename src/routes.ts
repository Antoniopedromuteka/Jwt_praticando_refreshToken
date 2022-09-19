
import { Request, Response, Router } from "express";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";
import { AuthenticateUserController } from "./useCases/authenticateUser/AuthenticateUserController";
import { CreateUserController } from "./useCases/createUser/CreateUserController";
import { RefreshTokenUserController } from "./useCases/refreshTokenUser/refreshTokenUserController";


const router = Router();

 

const createUserController = new CreateUserController();

const authenticateUserController = new AuthenticateUserController();

const refreshTokenUserController = new RefreshTokenUserController();


router.post("/users", createUserController.handle);

router.post("/refresh-token", refreshTokenUserController.handle)


router.post("/login", authenticateUserController.handle);


router.get("/courses", ensureAuthenticated, (request:Request, response:Response) =>{
    return response.json([
        {id:1, name: "NodeJS"},
        {id:2, name: "ReactJS"},
        {id:3, name: "React Native"},
        {id:4, name: "Fluetter"},
        {id:5, name: "Elixir"},
    ])
})






export {router};

