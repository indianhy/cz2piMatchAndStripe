import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { MatchController } from './match.controller';
import { MatchService } from './match.service';
import { MulterModule } from '@nestjs/platform-express';

@Module({
    imports:[
        TypeOrmModule.forFeature([UserRepository]),
        MulterModule.register({
            dest:'./files'
          })
    ],
    controllers: [MatchController],
    providers: [MatchService]
})
export class MatchModule {}
