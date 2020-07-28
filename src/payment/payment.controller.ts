import { Controller, Get } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('/payment')
export class PaymentController {

    constructor(private payService:PaymentService){}

    @Get()
    getStripe(){
        console.log('getStripecontroller')
        return this.payService.getStripe() 
    } 
}
