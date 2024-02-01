import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('users')
@ApiBearerAuth()
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  getUsers(): any {
    return this.userService.findAll();
  }
}
