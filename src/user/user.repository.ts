import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';

@Injectable()
export class UserRepository {
  private users: User[] = [
    {
      id: 1,
      email: 'admin@gmail.com',
      name: 'Super Admin',
      password: '123',
      role: 'ADMIN',
    },
    {
      id: 2,
      email: 'user@gmail.com',
      name: 'Huy',
      password: '123',
      role: 'USER',
    }
  ];

  findAll(): Omit<User, 'password'>[] {
    return this.users.map(({ password, ...user }) => user); //bảo mật 
  }

  delete(id: number): void {
    this.users = this.users.filter(user => user.id !== id);
  }
}