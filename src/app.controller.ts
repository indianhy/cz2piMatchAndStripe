import { Controller, Get, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import {FileInterceptor} from '@nestjs/platform-express'
import { AppService } from './app.service';
import * as csv from 'csvtojson'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return this.appService.getHello();
  }
  
  @Post('/uploadfile')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file)
  {
    const res = await csv({"delimiter":";"}).fromFile(file.path)

    return res;
  }
}
 