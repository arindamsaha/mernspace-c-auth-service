import fs from 'fs';
import path from 'path';
import createHttpError from 'http-errors';
import { sign, JwtPayload } from 'jsonwebtoken';
import { Configs } from '../config/index.js';
import { AppDataSource } from '../config/data-source.js';





export class TokenService {
    genarateAccessToken(payload: JwtPayload) {
        let privateKey: Buffer;

        try {
            const keyPath = path.join(process.cwd(), 'keys', 'privateKey.pem');

            privateKey = fs.readFileSync(keyPath);

            //privateKey = fs.readFileSync(path.join(path.join(__dirname, '../../keys/privateKey.pem')));
        } catch (error) {
            const err = createHttpError(
                500,
                'Failed to read the private key for signing JWT',
            );
            throw err
        }

        const accessToken = sign(payload, privateKey, {
            expiresIn: '1h',
            algorithm: 'RS256',
            issuer: 'auth-service',
        });
        return accessToken;
    }

    async genarateRefreshToken(payload: JwtPayload) {

        const refreshTokenRepository =
            AppDataSource.getRepository('RefreshToken');
        const newRefreshToken = await refreshTokenRepository.save({
            user: payload.sub,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        });
        const refreshToken = sign(
            payload,
            Configs.REFRESH_TOKEN_SECRET!,
            {
                expiresIn: '7d',
                algorithm: 'HS256',
                issuer: 'auth-service',
                jwtid: String(newRefreshToken.id), // Store the refresh token ID in the JWT
            },
        );
        return refreshToken;
    }
}
