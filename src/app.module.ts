import { Module } from '@nestjs/common';
import { TodosModule } from './todos/todos.module';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';

@Module({
  imports: [TodosModule,UserModule],
  controllers: [AppController]
})
export class AppModule {}