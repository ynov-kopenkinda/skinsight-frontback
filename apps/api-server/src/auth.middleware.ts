import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const { env } = await import('@kopenkinda/env');
    if (req.headers.authorization !== env.STEAM_BOT_AUTHTOKEN) {
      return res.status(401).send('Unauthorized');
    }
    return next();
  }
}
