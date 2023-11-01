import { ApiProperty } from '@nestjs/swagger';
import { SteamTradoffer } from '../models/tradeoffer.model';

export class GetOffersDto {
  @ApiProperty({ type: [SteamTradoffer] })
  public readonly sent: SteamTradoffer[];
  @ApiProperty({ type: [SteamTradoffer] })
  public readonly received: SteamTradoffer[];
}
