/*
Entity đại diện cho Table trong Dtb. Mỗi một Instance của Entity tươg đương 1 hàng dữ liệu trong Dtb
Entity ánh xạ các thuộc tính thành các cột trong Dtb qua ỎM/ODM
Xác định quan hệ giữa các bảng, tương tác trực tiếp với Dtb 
Entity làm việc ở tầng Service/repository 
*/

export class User {
  id!: number;
  email!: string;
  name!: string;
  password?: string; 
  role!: string;
}