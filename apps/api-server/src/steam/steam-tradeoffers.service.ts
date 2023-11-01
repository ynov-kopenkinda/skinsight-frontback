import { Injectable, Logger } from '@nestjs/common';
import TradeofferManager, { EOfferFilter } from 'steam-tradeoffer-manager';
import type TradeOffer from 'steam-tradeoffer-manager/lib/classes/TradeOffer';
import SteamUser from 'steam-user';
import { SteamUserService } from './steam-user.service';

type CleanupFn = () => void;

@Injectable()
export class SteamTradeoffersService {
  private manager: TradeofferManager;
  private readonly logger = new Logger(SteamTradeoffersService.name);

  constructor(private steamUserService: SteamUserService) {
    this.manager = new TradeofferManager({
      steam: this.steamUserService.getClient(),
      domain: 'localhost',
      language: 'en',
    });
    this.applyCookies()
      .then(() => {
        this.logger.log('Applied cookies successfully');
      })
      .catch((error) => {
        this.logger.error(error);
      });
  }

  private applyCookies(timeout = 20000): Promise<void> {
    const manager = this.manager;
    return new Promise((resolve, reject) => {
      const to = setTimeout(() => {
        return reject(
          new Error("Couldn't apply cookies before timeout expired"),
        );
      }, timeout);
      const client = this.steamUserService.getClient();
      client.on('error', function (e) {
        clearTimeout(to);
        if (e.eresult === SteamUser.EResult.RateLimitExceeded) {
          return reject(new Error('Rate limit exceeded'));
        }
        return reject(new Error("Couldn't apply cookies"));
      });

      client.on('webSession', function (_sessionID, cookies) {
        clearTimeout(to);
        manager.setCookies(cookies, function (err) {
          if (err ?? manager.apiKey === null) {
            return reject(new Error("Couldn't apply cookies"));
          }
          return resolve();
        });
      });
    });
  }

  getManager(): TradeofferManager {
    return this.manager;
  }

  async getOffers(
    type: 'all' | 'active' | 'past' = 'active',
  ): Promise<{ sent: TradeOffer[]; received: TradeOffer[] }> {
    return new Promise((resolve, reject) => {
      const filter: Record<'all' | 'past' | 'active', number> = {
        all: EOfferFilter.All,
        active: EOfferFilter.ActiveOnly,
        past: EOfferFilter.HistoricalOnly,
      };
      this.manager.getOffers(
        filter[type] ?? EOfferFilter.ActiveOnly,
        (err, sent, received) => {
          if (err) {
            return reject(new Error(err.message));
          }
          return resolve({ sent, received });
        },
      );
    });
  }

  onOffer(cb: (offer: TradeOffer) => Promise<void>): CleanupFn {
    const fn = function (offer: Parameters<typeof cb>[0]) {
      void cb(offer);
    };
    this.manager.on('newOffer', fn);
    return () => {
      this.manager.off('newOffer', fn);
    };
  }
}
