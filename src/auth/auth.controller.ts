import { Body, Controller, Get, Post, Req, Res, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
// import { Roles } from 'src/roles/roles.decorator';
// import { Role } from 'src/users/enums/role.enum';
import { AuthGuard } from '@nestjs/passport';
// import { RolesGuard } from 'src/roles/roles.guard';

@ApiBearerAuth()
// @Roles(Role)
// @UseGuards(AuthGuard('jwt'))
@ApiTags('Users')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private userService: UsersService) {}

  @Post('login')
  async login(@Req() req, @Res() res, @Body() body) {
    const auth = await this.authService.login(body);
    res.status(auth.status).json(auth.msg);
  }

  @Post('register')
  async register(@Req() req, @Res() res, @Body() body) {
    const auth = await this.authService.register(body);
    // console.log(body);
    res.status(auth.status).json(auth.content);
  }

  // User realted routes

  @Get('user')
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
