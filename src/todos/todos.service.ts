import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { TodoRepository } from './todo.repository';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodosService {
  constructor(private readonly todoRepository: TodoRepository) {}

  create(createTodoDto: CreateTodoDto, userId: number) {
    return this.todoRepository.create(createTodoDto, userId);
  }

  findAll(userId: number) {
    return this.todoRepository.findAllByUserId(userId);
  }

  update(id: number, updateTodoDto: UpdateTodoDto, requestUserId: number) {
    const todo = this.todoRepository.findById(id);
    if (!todo) throw new NotFoundException('Todo không tồn tại');
    if (todo.userId !== requestUserId) {
      throw new ForbiddenException('Bạn không được phép sửa Todo của người khác!');
    }
    return this.todoRepository.update(id, updateTodoDto);
  }

  remove(id: number, requestUserId: number) {
    const todo = this.todoRepository.findById(id);
    if (!todo) throw new NotFoundException('Todo không tồn tại');
    if (todo.userId !== requestUserId) {
      throw new ForbiddenException('Bạn không được phép xóa Todo của người khác!');
    }
    this.todoRepository.delete(id);
    return { message: 'Đã xóa thành công' };
  }
}