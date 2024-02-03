import { Body, Controller, Get, HttpCode, Param, Patch, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrnetUser } from './user.decoration';
import { UserDto } from './user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  @Auth()
  async getProfile(@CurrnetUser('id') id:number){
    return this.userService.byID(id)
  }

  @Get('by-id/:id')
  async getUser(@Param('id') id:string){
    return this.userService.byID(+id)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put(':id')
  @Auth()
  async updateUser(@Param('id') id:string, @Body() dto: UserDto){
    return this.userService.upDateProfile(+id,dto)
  }



  @HttpCode(200)
  @Patch('subscribe/:channelId')
  @Auth()
  async subscribeToChannel(@CurrnetUser('id') id:number, @Param('channelId') channelId:string,){
    return this.userService.subscribe(id, +channelId)
  }

  @Get()
  async getUsers(){
    return this.userService.getAll()
  }

}
