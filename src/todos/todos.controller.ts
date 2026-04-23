import { Controller, Get, Post, Body, Param, Delete, Query, Put } from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  create(@Body() createTodoDto: CreateTodoDto, @Body('userId') userId: number) {
    return this.todosService.create(createTodoDto, Number(userId));
  }

  @Get()
  findAll(@Query('userId') userId: string) {
    return this.todosService.findAll(Number(userId));
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateTodoDto: UpdateTodoDto,
    @Body('userId') requestUserId: number
  ) {
    return this.todosService.update(Number(id), updateTodoDto, Number(requestUserId));
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Body('userId') requestUserId: number) {
    return this.todosService.remove(Number(id), Number(requestUserId));
  }
}