import { Controller, Get, Post, Body, Param, Delete, Query, ForbiddenException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Thay thế cho /register
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(@Query('role') role: string) {
    // Logic check Admin cứng
    if (role !== 'ADMIN') {
      throw new ForbiddenException('Chỉ Admin mới có quyền xem danh sách User!');
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
      throw new ForbiddenException('Chỉ Admin mới được xóa user!');
    }
    return this.usersService.remove(Number(deleteId), Number(requestUserId));
  }
}