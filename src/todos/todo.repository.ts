import { Injectable } from '@nestjs/common';
import { Todo } from './entities/todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodoRepository {
  private todos: Todo[] = [];

  findAllByUserId(userId: number): Todo[] {
    return this.todos.filter(todo => todo.userId === userId);
  }

  findById(id: number): Todo | undefined {
    return this.todos.find(todo => todo.id === id);
  }

  create(createTodoDto: CreateTodoDto, userId: number): Todo {
    const newTodo: Todo = {
      id: Date.now(),
      ...createTodoDto,
      completed: false,
      userId,
      createdAt: Date.now(),
    };
    this.todos.push(newTodo);
    return newTodo;
  }

  update(id: number, updateTodoDto: UpdateTodoDto): Todo {
    const index = this.todos.findIndex(todo => todo.id === id);
    this.todos[index] = { ...this.todos[index], ...updateTodoDto };
    return this.todos[index];
  }

  delete(id: number): void {
    this.todos = this.todos.filter(todo => todo.id !== id);
  }
}