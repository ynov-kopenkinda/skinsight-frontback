import { SteamItem } from './steam-item.model';
import { SteamPartner } from './steam-partner.model';

export class SteamTradoffer {
  id?: string;
  partner: SteamPartner;
  message: string;
  state: number;
  itemsToGive: SteamItem[];
  itemsToReceive: SteamItem[];
  isOurOffer: boolean;
  created: Date;
  updated: Date;
  expires: Date;
  confirmationMethod: number;
}
