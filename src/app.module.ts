import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import {MulterModule} from '@nestjs/platform-express'
import { MatchModule } from './match/match.module';
import { PaymentModule } from './payment/payment.module';
import { StripeModule } from 'nestjs-stripe'
import { PaymentService } from './payment/payment.service';
import { PaymentController } from './payment/payment.controller';
@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig), 
    MulterModule.register({
      dest:'./files'
    }),

    StripeModule.forRoot({
      apiKey:'sk_test_51H9mToJrBfyk7bv3BlQRCJgF4KcVUBuIL6QbzpXvdRLU9BOmeyPNBbMU2LyaYrCtf738WhIJIkL84sBzL7aR3d5700v9Y9xrSj',
      apiVersion:'2020-03-02'
  }),

    
    MatchModule,
    
    PaymentModule,
    
  ],
  
  //controllers: [PaymentController],
  //providers: [PaymentService],
}) 
export class AppModule {} 
