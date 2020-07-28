import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class MatchService {

    constructor(private userRepository: UserRepository){}

    async createUser(createUserDto:CreateUserDto):Promise<User>{
        return this.userRepository.createUser(createUserDto) 
    }

    async getUsers():Promise<User[]>{
        return this.userRepository.getUsers()
    }

    async getUserById(username:string):Promise<User>{
        return this.userRepository.getUser(username)
    }

}
