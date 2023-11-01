import { ApiProperty } from '@nestjs/swagger';

export class SteamItem {
  @ApiProperty()
  id: string;

  @ApiProperty()
  appid: number;

  @ApiProperty()
  amount: number;

  @ApiProperty()
  icon_url?: string;

  @ApiProperty()
  icon_large_url?: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  market_name?: string;

  @ApiProperty()
  tradable: boolean;

  @ApiProperty()
  marketable: boolean;

  @ApiProperty()
  commodity: boolean;

  @ApiProperty()
  market_tradable_restriction: number;
}
