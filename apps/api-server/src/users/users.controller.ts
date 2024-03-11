import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from "@nestjs/common";
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";

import { CreateUserDto } from "./dto/create-user.dto";
import { PatchUserDto } from "./dto/patch-user.dto";
import { User } from "./entities/user.entity";
import { UserService } from "./users.service";

@ApiTags("users")
@Controller("users")
export class UsersController {
  constructor(private usersService: UserService) {}

  @ApiOkResponse({ type: User, isArray: true })
  @ApiNotFoundResponse()
  @Get()
  async getUsers(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @ApiOkResponse({ type: User })
  @ApiOperation({ summary: "Get a user depending on passed id" })
  @Get(":id")
  getUserById(@Param("id", ParseIntPipe) id: number): Promise<User> {
    const user = this.usersService.findOne({ where: { id } });
    if (!user) throw new NotFoundException();
    return user;
  }

  @ApiCreatedResponse({ type: User })
  @Post("/doctor")
  @ApiOperation({ summary: "Create a doctor" })
  createDoctor(@Body() body: CreateUserDto): Promise<User> {
    return this.usersService.createDoctor({ ...body, userRole: "DOCTOR" });
  }

  @ApiCreatedResponse({ type: User })
  @Post("")
  @ApiOperation({ summary: "Create a user" })
  createUser(@Body() body: CreateUserDto): Promise<User> {
    return this.usersService.createUser(body);
  }

  @ApiCreatedResponse({ type: User })
  @ApiOperation({ summary: "Update a user depending on passed id" })
  @Patch(":id")
  updateUser(@Param("id", ParseIntPipe) id: number, @Body() dto: PatchUserDto) {
    return this.usersService.updateUser({
      where: { id },
      dto: dto,
    });
  }

  @ApiOperation({ summary: "Delete a user depending on passed id" })
  @ApiOkResponse({ type: User })
  @Delete(":id")
  deleteUser(@Param("id", ParseIntPipe) id: number): Promise<User> {
    return this.usersService.deleteUser({ id });
  }
}
