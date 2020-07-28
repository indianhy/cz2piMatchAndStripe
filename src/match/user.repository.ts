import { Repository, EntityRepository } from "typeorm";
import { User } from "./user.entity";
import { CreateUserDto } from "./create-user.dto";
import { InternalServerErrorException, Logger } from "@nestjs/common";

@EntityRepository(User)
export class UserRepository extends Repository<User>{

    private logger = new Logger('UserRepository')

    async createUser(createUserDto:CreateUserDto):Promise<User>{
        const {username, identifier, otp,recovery_code, first_name, last_name, department, location, country, planet} = createUserDto

        const user = new User()
        
        user.username=username
        user.identifier=identifier
        user.otp=otp
        user.recovery_code=recovery_code
        user.first_name=first_name
        user.last_name=last_name
        user.department=department
        user.location=location
        user.country=country
        user.planet=planet

        try{
            await user.save()
        }
            catch(error){
                this.logger.error(`Failed to create a task for user "${user.username}". DTO: ${JSON.stringify(createUserDto)}`,error.stack)
                throw new InternalServerErrorException() 
            }
 
        return user
    } 

    async getUsers():Promise<User[]>{

        const query = this.createQueryBuilder('user')

        try{
        const users = await query.getMany()
        return users
    }
        catch(error){
            this.logger.error(`Failed to get users.`,error.stack)
            throw new InternalServerErrorException()
        }
    }  

    async getUser(username:string):Promise<User>{

        const query = this.createQueryBuilder('task')

        query.andWhere('task.username = :username',{username:username})

        try{
        const users = await query.getOne()
        return users}
        catch(error){
            this.logger.error(`Failed to get tasks for user "${username}". `,error.stack)
            throw new InternalServerErrorException()
        }
    } 

}