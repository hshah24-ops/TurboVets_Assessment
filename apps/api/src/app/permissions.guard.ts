import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RoleService } from './role.service';
import { PERMISSION_KEY } from './permissions.decorator';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly roleService: RoleService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermission = this.reflector.get<string>(
      PERMISSION_KEY,
      context.getHandler(),
    );

    // 🟢 Log what permission is being checked
    console.log('🔍 [Guard] Required Permission:', requiredPermission);

    if (!requiredPermission) {
      console.log('⚠️ [Guard] No permission metadata found, allowing access.');
      return true;
    }

    // ✅ TEMP: mock user role ID (replace with JWT later)
    const mockUserRoleId = 3;
    console.log('[Guard] Checking permissions for Role ID:', mockUserRoleId);

    // Call RoleService.hasPermission and log result
    const hasPermission = await this.roleService.hasPermission(
      mockUserRoleId,
      requiredPermission,
    );

    console.log('[Guard] Permission check result:', hasPermission);

    return hasPermission;
  }
}