import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";

//To use this guard add @UseGuards(AccessTokenGuard, AdminGuard) to your controller
@Injectable()
export class AdminGuard implements CanActivate {
  constructor() {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return request.user.isAdmin;
  }
}
