import { SteamTradoffer } from '../models/tradeoffer.model';

export class GetOffersDto {
  public readonly sent: SteamTradoffer[];
  public readonly received: SteamTradoffer[];
}
