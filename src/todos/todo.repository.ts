import { Injectable } from '@nestjs/common';
import { Todo } from './entities/todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

//tầng repo này chỉ nên thuần làm việc với dtb 
//còn logic nên nằm ở tầng service và truyền xuống cho repo, call đến dtb 

@Injectable()
export class TodoRepository {
  private todos: Todo[] = [
    {id:123456,userId:2,title:'cong viec 1',completed:false,createdAt:123}
  ];

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
    const index = this.todos.findIndex(todo => todo.id === id);//logic nên nằm trên tầng service 
    this.todos[index] = { ...this.todos[index], ...updateTodoDto };
    return this.todos[index];
  }

  delete(id: number): void {
    this.todos = this.todos.filter(todo => todo.id !== id);
  }
}