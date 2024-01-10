
interface User {
  Id: number;
  Email: string;
  Firstname: string;
  Lastname: string;
  Password: string;
  IsActive: boolean;
  UserRoleId: Number;
  CompanyId: Number;
  DeletedAt: Date;
}

export default User;
