import { CanActivate, ExecutionContext, Injectable, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RoleService } from './role.service'; 

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private roleService: RoleService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Get required permissions from custom decorator (we’ll create it next)
    const requiredPermissions = this.reflector.get<string[]>('permissions', context.getHandler());

    if (!requiredPermissions || requiredPermissions.length === 0) {
      // No permissions required, allow access
      return true;
    }

    const request = context.switchToHttp().getRequest();

    // Assuming user info (with roleId) is attached to request object after JWT auth
    const user = request.user;
    if (!user) {
      throw new UnauthorizedException('User not authenticated');
    }

    const roleId = user.roleId;
    if (!roleId) {
      throw new ForbiddenException('User has no role assigned');
    }

    // Check if user's role (including inherited roles) has ANY of the required permissions
    for (const permission of requiredPermissions) {
      const hasPerm = await this.roleService.hasPermission(roleId, permission);
      if (hasPerm) {
        return true;
      }
    }

    throw new ForbiddenException('You do not have permission (guard)');
  }
}