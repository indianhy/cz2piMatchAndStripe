import { Controller, Post, UsePipes, ValidationPipe, Body, UseInterceptors, UploadedFile, Get, Param, ParseIntPipe, Req } from '@nestjs/common';
import { MatchService } from './match.service';
import { CreateUserDto } from './create-user.dto';
import { User } from './user.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import * as csv from 'csvtojson'

@Controller('/match') 
export class MatchController {
    
    constructor(private matchService :MatchService){}

    @Get()
    getUsers(){  
        console.log('getuserscontroller')   
        return 'hellohy' 
        //return this.matchService.getUsers()
    }

    @Get('/payment')
    getStripe(){ 
        console.log('getStripecontroller')
        return this.matchService.getStripe() 
    } 

    @Get('/:username')
    getUserById(@Param('username') username:string):Promise<User>{
        return this.matchService.getUserById(username)
    }
    @Post('/create')
    @UsePipes(ValidationPipe) 
    async createUserData(
        @Body()createTaskDto : CreateUserDto,
        ):Promise<User>
    {
        //this.logger.verbose(`User "${req.user.username}" creating a new task. Data: ${JSON.stringify(createTaskDto)}`)
        return this.matchService.createUser(createTaskDto)                
    }

    @Post('/uploadfile')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file)
    {
        console.log(file)
        console.log(file.path)
      const res = await csv({"delimiter":";"}).fromFile(file.path)
  
      res.forEach(async element => {
          await this.createUserData(element)
      });

      return res;
    }
   
    @Post('/file')
    @UseInterceptors(FileInterceptor('file'))
    async matchFile(@UploadedFile() file) 
    {

      const from_file = await csv({"delimiter":";"}).fromFile(file.path)
      const from_db = await this.getUsers()

      var fl=from_file.length;
      var dl=from_db.length;
      var max=fl>dl?fl:dl;
    
      var res = fl>dl?this.matcher(from_db,from_file):this.matcher(from_file,from_db)

      console.log("res max",res,max*10)
      return `${(res/max)*10}% match`;  
     }

     matcher(a,b){ 
         var m=0
        a.forEach(e => {
            var u=b.find(x=>x.username==e.username)
            m=m+this.matcher2(e,u)
        });
        console.log("m1",m)
        return m;
     }

     matcher2(e,u):number{
         var m=0
         if(this.matchStr(e.username,u.username)) m++
         if(this.matchStr(e.identifier,u.identifier)) m++
         if(this.matchStr(e.otp,u.otp)) m++
         if(this.matchStr(e.recovery_code,u.recovery_code)) m++
         if(this.matchStr(e.first_name,u.first_name)) m++
         if(this.matchStr(e.last_name,u.last_name)) m++
         if(this.matchStr(e.department,u.department)) m++
         if(this.matchStr(e.location,u.location)) m++
         if(this.matchStr(e.country,u.country)) m++
         if(this.matchStr(e.planet,u.planet)) m++
         return m 
     } 

    //  matcher2(e,u):number{
    //     var m=0
    //     for(var key in Object.keys(e[0])){  
            
    //         if(this.matchStr(e[key],u[key])){
    //             console.log(key,e,u)
    //             m++ 
    //         }
    //     }
    //     console.log("m2",m) 
    //     return m  
    //  }
 

     matchStr(a:string, b:string){
         return a.toUpperCase() == b.toUpperCase()
     }

     @Post('/object')
    @UseInterceptors(FileInterceptor('file'))
    async matchObject(@UploadedFile() file) 
    {

      const from_file = await csv({"delimiter":";"}).fromFile(file.path)

      console.log(from_file[0]) 

      const from_db = await this.getUserById(from_file[0].username)

      if(!from_db){
          return "0% match"
      }
      console.log(from_db)
      var m = 0
      var keys=Object.keys(from_file[0]) 
      console.log(keys)
      keys.forEach(key=>{
          if(from_file[0][key].toUpperCase() == from_db[key].toUpperCase())
            m++
      })
 
      return `${m*10}% matches`;  
     }


}
 