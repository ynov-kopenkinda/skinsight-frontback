import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { UserService } from "src/users/users.service";

import { jwtConstants } from "./constant";
import { loginUserDTO } from "./dto/login-user.dto";

@Injectable()
export class AuthService {
  saltOrRounds = 10;
  bcrypt = require("bcryptjs");

  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {
    // init bcrypt salt
    this.bcrypt.genSaltSync(this.saltOrRounds);
  }

  async signUp(createUser: CreateUserDto): Promise<any> {
    const newUser = await this.usersService.createUser(createUser);
    const tokens = await this.getTokens(newUser.email);
    return tokens;
  }

  async signIn(data: loginUserDTO) {
    // Check if user exists
    const email = data.email;
    const user = await this.usersService.findOne({ where: { email } });

    if (!(await this.bcrypt.compareSync(data.password, user.password))) {
      throw new BadRequestException("Password is incorrect");
    }

    const tokens = await this.getTokens(user.email);
    return tokens;
  }

  hashData(data: string) {
    return this.bcrypt.hashSync(data);
  }

  async getTokens(email: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          email: email,
        },
        {
          secret: jwtConstants.secret,
          expiresIn: "20m",
        },
      ),
      this.jwtService.signAsync(
        {
          email: email,
        },
        {
          secret: jwtConstants.secretRefresh,
          expiresIn: "30d",
        },
      ),
    ]);

    return { accessToken, refreshToken };
  }
  "";

  async refreshTokens(email: string) {
    const user = await this.usersService.findOne({ where: { email } });
    if (!user) {
      throw new ForbiddenException("Access Denied");
    }
    const tokens = await this.getTokens(user.email);
    return tokens;
  }
}
