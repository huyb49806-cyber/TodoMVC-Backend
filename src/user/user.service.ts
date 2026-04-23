import { Injectable, BadRequestException } from '@nestjs/common';
import { UserRepository } from './user.repository';
//BadReqExp ném ra lỗi 400 
@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  findAll() {
    return this.userRepository.findAll();
  }

  remove(deleteId: number, requestUserId: number) {
    if (deleteId === requestUserId) {
      throw new BadRequestException('Ko the tu xoa chinh minh');
    }
    this.userRepository.delete(deleteId);
    return { message: 'Xoa user thanh cong' };
  }
}