import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
} from '@nestjs/common';
import { UsersService, newUser } from './users.service';
import { ApiBearerAuth, ApiBody, ApiProperty, ApiTags } from '@nestjs/swagger';
import { userDto } from './dto/user.dto';
import { uuid } from 'uuidv4';

@ApiTags('users')
@Controller('users')
@ApiBearerAuth()
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  getUsers(): any {
    return this.userService.findAll();
  }

  @Get(':email')
  getUserByEmail(@Param('email') email: string): any {
    return this.userService.findOneByEmail(email);
  }

  @Post()
  @ApiBody({ type: userDto })
  createUser(@Body() body: userDto): any {
    const finalData: newUser = {
      id: uuid(),
      anon_id: uuid(),
      ...body,
      emailVerified: null,
    };
    return this.userService.createUser(finalData);
  }

  @Post(':email')
  @ApiBody({ type: userDto })
  updateUser(@Param('email') email: string, @Body() body: userDto): any {
    return this.userService.updateUser(email, body);
  }

  @Delete(':email/delete')
  deleteUser(@Param('email') email: string): any {
    return this.userService.deleteUser(email);
  }
}
