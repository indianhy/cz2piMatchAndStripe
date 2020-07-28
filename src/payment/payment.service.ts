import { Injectable } from '@nestjs/common';
import { InjectStripe } from 'nestjs-stripe';
import Stripe from 'stripe';

@Injectable()
export class PaymentService {

    constructor(@InjectStripe() private stripeClient:Stripe){}

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
