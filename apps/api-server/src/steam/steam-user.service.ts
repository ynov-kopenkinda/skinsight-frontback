import { Injectable, Logger } from '@nestjs/common';
import SteamUser from 'steam-user';
import SteamTotp from 'steam-totp';
import { SteamUserStatus } from './steam-user-status.enum';

@Injectable()
export class SteamUserService {
  private client = new SteamUser();
  private status: SteamUserStatus = SteamUserStatus.Offline;
  private readonly logger = new Logger(SteamUserService.name);

  constructor() {
    this.login();
  }

  async login(): Promise<void> {
    import('@kopenkinda/env')
      .then(({ env }) => {
        this.client.logOn({
          accountName: env.STEAM_ACCOUNT_NAME,
          password: env.STEAM_ACCOUNT_PWD,
          twoFactorCode: SteamTotp.generateAuthCode(
            env.STEAM_ACCOUNT_SHARED_SECRET,
          ),
        });
        this.client.on('loggedOn', () => {
          this.logger.log('Connected to Steam');
          this.status = SteamUserStatus.Online;
        });
        this.client.on('disconnected', () => {
          this.logger.log('Disconnected from Steam');
          this.status = SteamUserStatus.Offline;
        });
      })
      .catch((error) => {
        this.logger.error(error);
      });
  }

  getStatus(): SteamUserStatus {
    return this.status;
  }

  getClient(): SteamUser {
    return this.client;
  }
}
