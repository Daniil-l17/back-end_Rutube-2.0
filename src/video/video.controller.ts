import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { VideoService } from './video.service';
import { CurrnetUser } from 'src/user/user.decoration';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { videoDta } from './video.dto';

@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Get('get-private/:id')
  @Auth()
  async getVideoPrivate(@Param('id') id:string){
    return this.videoService.byID(+id)
  }

  @Get()
  async getAll(@Query('searchTerm') searchTerm?:string){
    return this.videoService.getAll(searchTerm)
  }

  @Get('most-popular')
  async getMostPopular(){
    return this.videoService.getMostPopular()
  }

  @Get(':id')
  async getVideo(@Param('id') id:string){
    return this.videoService.byID(+id)
  }


  @HttpCode(200)
  @Post()
  @Auth()
  async createVideo(@CurrnetUser('id') id:number){
    return this.videoService.create(id)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put(':id')
  @Auth()
  async upDateVideo(@Param('id') id:string,@Body() dto: videoDta){
    return this.videoService.update(+id,dto)
  }

  @HttpCode(200)
  @Delete(':id')
  @Auth()
  async deleteVideo(@Param('id') id:string){
    return this.videoService.delete(+id)
  }

  @HttpCode(200)
  @Put('update-views/:videoId')
  async updateViews(@Param('videoId') videoId:string){
    return this.videoService.updateCountViews(+videoId)
  }

  @HttpCode(200)
  @Put('update-likes/:videoId')
  async updateLikes(@Param('videoId') videoId:string){
    return this.videoService.updateLike(+videoId)
  }


}
