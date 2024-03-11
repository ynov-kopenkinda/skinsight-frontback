import { ApiProperty } from '@nestjs/swagger';

export class chatDto {
  @ApiProperty()
  id: string;
  @ApiProperty()
  initiatorId: string;
  @ApiProperty()
  inviteeId: string;
}
