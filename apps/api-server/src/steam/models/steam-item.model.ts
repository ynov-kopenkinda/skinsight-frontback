export class SteamItem {
  id: string;
  appid: number;
  amount: number;
  icon_url?: string;
  icon_large_url?: string;
  name: string;
  market_name?: string;
  tradable: boolean;
  marketable: boolean;
  commodity: boolean;
  market_tradable_restriction: number;
}
