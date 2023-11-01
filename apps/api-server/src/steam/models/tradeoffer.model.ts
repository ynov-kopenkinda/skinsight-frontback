import { ApiProperty } from '@nestjs/swagger';
import { SteamItem } from './steam-item.model';
import { SteamPartner } from './steam-partner.model';

export class SteamTradoffer {
  @ApiProperty()
  id?: string;

  @ApiProperty({ type: SteamPartner })
  partner: SteamPartner;

  @ApiProperty()
  message: string;

  @ApiProperty()
  state: number;

  @ApiProperty({ type: [SteamItem] })
  itemsToGive: SteamItem[];

  @ApiProperty({ type: [SteamItem] })
  itemsToReceive: SteamItem[];

  @ApiProperty()
  isOurOffer: boolean;

  @ApiProperty()
  created: Date;

  @ApiProperty()
  updated: Date;

  @ApiProperty()
  expires: Date;

  @ApiProperty()
  confirmationMethod: number;
}
