import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class HealthController {
  @Get()
  health() {
    return {
      status: 'ok',
      runtime: process.version,
      environment: process.env.NODE_ENV,
      mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/taskflow',
    };
  }
}
