// todos.service.ts
import { Injectable } from '@nestjs/common';
import { TodoRepository } from './todo.repository';

@Injectable()
export class TodoService {
  constructor(private readonly repo: TodoRepository) {}

  getTodos(isCompleted?: boolean) {
    return this.repo.findAll({ isCompleted });
  }
}