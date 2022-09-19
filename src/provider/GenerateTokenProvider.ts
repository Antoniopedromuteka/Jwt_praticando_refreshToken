import { sign } from "jsonwebtoken";


class GenerateTokenProvider{

    async execute(userId:string){
        const  token = sign({}, "muteka", {
            subject: userId,
            expiresIn: "1d"
        });


        return token;

    }

}



export {GenerateTokenProvider}