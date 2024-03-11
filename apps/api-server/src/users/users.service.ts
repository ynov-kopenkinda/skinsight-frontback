import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { hash } from "bcrypt";

import { PrismaService } from "../prisma/prisma.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { PatchUserDto } from "./dto/patch-user.dto";

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async user(userWhereUniqueInput: Prisma.UserWhereUniqueInput) {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(params: { where: Prisma.UserWhereUniqueInput }) {
    const { where } = params;
    return this.prisma.user.findUnique({
      where,
    });
  }

  async createDoctor(dto) {
    return this.prisma.user.create({
      data: {
        ...dto,
        password: await hash(dto.password, 10),
      },
    });
  }

  async createUser(dto: CreateUserDto) {
    return this.prisma.user.create({
      data: {
        ...dto,
        password: await hash(dto.password, 10),
      },
    });
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    dto: PatchUserDto;
  }) {
    const { where } = params;
    return this.prisma.user.update({
      data: params.dto,
      where,
    });
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput) {
    return this.prisma.user.delete({
      where,
    });
  }
}
