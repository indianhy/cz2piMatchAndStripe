import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { InjectStripe } from 'nestjs-stripe';
import Stripe from 'stripe';

@Injectable()
export class MatchService {

    constructor(@InjectStripe() private stripeClient:Stripe,private userRepository: UserRepository){}

    async createUser(createUserDto:CreateUserDto):Promise<User>{
        return this.userRepository.createUser(createUserDto) 
    }

    async getUsers():Promise<User[]>{
        return this.userRepository.getUsers()
    }

    async getUserById(username:string):Promise<User>{
        return this.userRepository.getUser(username)
    }

    async getStripe(){
        const paymentIntent = await this.stripeClient.paymentIntents.create({
            amount: 1000,
            currency: 'inr',
            payment_method_types: ['card'],
            receipt_email: 'jenny.yadav@example.com',
          });
 
          console.log(paymentIntent)

          return paymentIntent
    }

}
