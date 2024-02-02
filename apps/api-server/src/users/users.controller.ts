import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { UsersService, newUser } from './users.service';
import { ApiBearerAuth, ApiBody, ApiProperty, ApiTags } from '@nestjs/swagger';
import { userDto } from './dto/user.dto';

@ApiTags('users')
@Controller('users')
@ApiBearerAuth()
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  getUsers(): any {
    return this.userService.findAll();
  }

  @Get(':anonId')
  getUserByAnonId(): any {
    return this.userService.findOneByAnonId('anonId');
  }

  @Post()
  @ApiBody({ type: userDto })
  createUser(@Body() body: userDto): any {
    const finalData: newUser = { ...body, emailVerified: new Date() };
    return this.userService.createUser(finalData);
  }
}
