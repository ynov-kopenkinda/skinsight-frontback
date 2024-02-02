import { ApiProperty } from '@nestjs/swagger';

enum UserRoles {
  DOCTOR = 'doctor',
  PATIENT = 'patient',
}
export class userDto {
  @ApiProperty()
  id: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  name?: string;
  @ApiProperty()
  image?: string;
  @ApiProperty()
  role?: UserRoles;
}
