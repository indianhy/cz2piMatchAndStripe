import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { StripeModule } from 'nestjs-stripe'

@Module({
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
