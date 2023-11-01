import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const { env } = await import('@kopenkinda/env');
    const header = req.headers.authorization;
    if (header == null || !header.startsWith('Bearer ')) {
      return res.status(401).send('Unauthorized');
    }
    const token = header.slice('Bearer '.length);
    if (token !== env.STEAM_BOT_AUTHTOKEN) {
      return res.status(401).send('Unauthorized');
    }
    return next();
  }
}
