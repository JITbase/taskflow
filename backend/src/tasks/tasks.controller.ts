import { Body, Controller, Delete, Get, Param, Patch, Post, Req } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasks: TasksService) {}

  @Get()
  findAll(@Req() req: any) { return this.tasks.findAll(req.query); }

  @Get(':id')
  findOne(@Param('id') id: string) { return this.tasks.findOne(id); }

  @Post()
  create(@Body() body: any, @Req() req: any) {
    return this.tasks.create({ ...body, ownerId: req.user?.userId || body.ownerId });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.tasks.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) { return this.tasks.remove(id); }

  @Get('admin/all')
  adminList() { return this.tasks.findAll({}); }
}
