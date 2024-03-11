import { ApiProperty } from '@nestjs/swagger';

export class chatEntity {
  @ApiProperty()
  id: string;
  @ApiProperty()
  initatorId: string;
  @ApiProperty()
  inviteeId: string;
}
