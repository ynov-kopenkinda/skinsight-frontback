import { ApiProperty } from '@nestjs/swagger';

enum UserRoles {
  DOCTOR = 'doctor',
  PATIENT = 'patient',
}
export class userEntity {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name?: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  emailVerified: any;
  @ApiProperty()
  image?: string;
  @ApiProperty()
  role?: UserRoles;
  @ApiProperty()
  anon_id: string;
}
