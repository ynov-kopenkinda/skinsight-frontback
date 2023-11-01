import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthMiddleware } from './auth.middleware';
import { SteamTradeoffersService } from './steam/steam-tradeoffers.service';
import { SteamUserService } from './steam/steam-user.service';
import { SteamApiController } from './steam/steam.controller';

@Module({
  imports: [],
  controllers: [AppController, SteamApiController],
  providers: [AppService, SteamUserService, SteamTradeoffersService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
