import { ApiProperty } from '@nestjs/swagger';

export class SteamPartner {
  @ApiProperty()
  accountid: number;
}
