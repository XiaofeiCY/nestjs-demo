import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import type { Request } from 'express';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private Reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roleList = this.Reflector.get<string[]>(
      'roleList',
      context.getHandler(),
    );
    const req = context.switchToHttp().getRequest<Request>();
    return roleList.includes(req.query.roleList as string);
  }
}
