import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import {MulterModule} from '@nestjs/platform-express'
import { MatchModule } from './match/match.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig), 
    MulterModule.register({
      dest:'./files'
    }),
    
    MatchModule,
  ],
  
  //controllers: [AppController],
  //providers: [AppService],
}) 
export class AppModule {}
