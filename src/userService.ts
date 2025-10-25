import { User, CreateUserRequest } from './types';

export class UserService {
  private users: User[] = [];

  async createUser(request: CreateUserRequest): Promise<User> {
    // Simple user creation
    const user: User = {
      id: this.users.length + 1,
      email: request.email,
      name: request.name,
      createdAt: new Date(),
    };

    this.users.push(user);
    return user;
  }

  async getUserById(id: number): Promise<User | undefined> {
    return this.users.find(u => u.id === id);
  }

  async getAllUsers(): Promise<User[]> {
    return this.users;
  }

  async deleteUser(id: number): Promise<boolean> {
    const index = this.users.findIndex(u => u.id === id);
    if (index >= 0) {
      this.users.splice(index, 1);
      return true;
    }
    return false;
  }
}
