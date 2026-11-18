import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projects: ProjectsService) {}
  @Get() findAll() { return this.projects.findAll(); }
  @Post() create(@Body() body: any) { return this.projects.create(body); }
  @Delete(':id') remove(@Param('id') id: string) { return this.projects.remove(id); }
}
