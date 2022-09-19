import { client } from "../../prisma/client"
import { GenerateTokenProvider } from "../../provider/GenerateTokenProvider"

import dayjs from "dayjs"
import { GenerateRefreshToken } from "../../provider/GenerateRefreshToken"


class RefreshTokenUserUseCase{

    async excute(refresh_token: string){

        const refreshToken = await client.refreshToken.findFirst({
            where: {
               id: refresh_token 
            }
        })

        if(!refreshToken){
            throw new Error(`Refresh token invalid`)
        }

        const refreshTokenExpired = dayjs().isAfter(dayjs.unix(refreshToken.expiresIn));
        
        const generateTokenProvider = new GenerateTokenProvider();
        const token = await generateTokenProvider.execute(refreshToken.userId);



        if(refreshTokenExpired){

            await client.refreshToken.deleteMany({
                where:{
                    userId: refreshToken.userId,
                }
            })

            const genrateRefreshTokenProvider = new GenerateRefreshToken();
            const newrefreshToken = await genrateRefreshTokenProvider.execute(refreshToken.userId)

            return {token, newrefreshToken}
        }

        return {token}
    }

}



export {RefreshTokenUserUseCase}