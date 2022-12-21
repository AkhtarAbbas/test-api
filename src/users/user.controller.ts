import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthService } from 'src/auth/auth.service';

@Controller('users')
export class AuthController {
  constructor(private authService: AuthService, private userService: UsersService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }
  // }
  // import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
  // import { AuthService } from 'src/auth/auth.service';
  // import { UsersService } from './users.service';
  // import { CreateTaskDto } from './dto/create-task.dto';
  // import { UpdateTaskDto } from './dto/update-task.dto';

  // @Controller('users')
  // export class UsersController {
  //   constructor(private authService: AuthService, private usersService: UsersService) {}

  // @Post()
  // create(@Body() createTaskDto: CreateTaskDto) {
  //   return this.tasksService.create(createTaskDto);
  // }

  // @Get()
  // findAll() {
  //   return this.usersService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.usersService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
  //   return this.tasksService.update(+id, updateTaskDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(+id);
  // }
}
