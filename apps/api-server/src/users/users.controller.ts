import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UsersService, newUser } from './users.service';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { userDto } from './dto/user.dto';
import { uuid } from 'uuidv4';
import { userEntity } from './entities/user.entity';

@ApiTags('users')
@Controller('users')
@ApiBearerAuth()
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  @ApiResponse({ status: 200, type: userEntity, isArray: true })
  getUsers(): any {
    return this.userService.findAll();
  }

  @Get(':email')
  @ApiResponse({ status: 200, type: userEntity })
  getUserByEmail(@Param('email') email: string): any {
    return this.userService.findOneByEmail(email);
  }

  @Post()
  @ApiResponse({ status: 201, type: userEntity })
  @ApiBody({ type: userEntity })
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
  @ApiResponse({ status: 200, type: userEntity })
  @ApiBody({ type: userDto })
  updateUser(@Param('email') email: string, @Body() body: userDto): any {
    return this.userService.updateUser(email, body);
  }

  @Delete(':email/delete')
  @ApiResponse({ status: 200, type: userEntity })
  deleteUser(@Param('email') email: string): any {
    return this.userService.deleteUser(email);
  }
}
