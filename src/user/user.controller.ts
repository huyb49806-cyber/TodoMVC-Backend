import { Controller, Get, Param, Delete, Body, Query, ForbiddenException } from '@nestjs/common';
import { UsersService } from './user.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(@Query('role') role: string) {
    if (role !== 'ADMIN') {
      throw new ForbiddenException('User khog co quyen');
    }
    return this.usersService.findAll();
  }

  @Delete(':id')
  remove(
    @Param('id') deleteId: string, 
    @Body('requestUserId') requestUserId: number, 
    @Body('role') role: string
  ) {
    if (role !== 'ADMIN') {
      throw new ForbiddenException('User khong co quyen');
    }
    return this.usersService.remove(Number(deleteId), Number(requestUserId));
  }
}