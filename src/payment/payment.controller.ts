import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('/payment')
export class PaymentController {

    constructor(private payService:PaymentService){}

    @Get()
    getStripe(){
        console.log('getStripecontroller')
        return this.payService.getStripe() 
    } 

    @Post('/pay')
    pay(@Req() req,@Res() res){
        console.log('paycontroller')  
        return this.payService.pay(req,res)
    }
}
 