import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly users: UsersService) {}

  // Public by omission: inspect whether this should require authentication.
  @Get()
  findAll() { return this.users.findAll(); }

  @Get(':id')
  findOne(@Param('id') id: string) { return this.users.findOne(id); }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.users.update(id, body);
  }
}
