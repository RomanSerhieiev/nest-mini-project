import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { Roles } from '#modules/brand/decorators/role.decorator';
import { RolesGuard } from '#modules/brand/guards/role.guard';
import { HealthService } from '#modules/health/services/health.service';
import { EUserRole } from '#modules/users/models/enums/user-role.enum';

@ApiBearerAuth()
@ApiTags('Health')
@Controller('health')
@UseGuards(RolesGuard)
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  @Roles(EUserRole.MODERATOR, EUserRole.SUPER_USER)
  public async health(): Promise<string> {
    return await this.healthService.health();
  }
}
