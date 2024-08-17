import { Repository } from "typeorm";
import { User } from "../entities/User";
import { AppDataSource } from "../config";

export class UserService {
  private userRepository: Repository<User>

  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
  }

  async createUser(userData: { username: string }) {
    const user = this.userRepository.create(userData);
    await this.userRepository.save(user);

    return user;
  }
}
