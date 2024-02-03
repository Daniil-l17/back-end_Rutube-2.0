import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SubscriptionEntity } from 'src/user/subscription.entiti';
import { UserEntity } from 'src/user/user.entiti';
import { FindOptionsWhereProperty, ILike, MoreThan, Repository } from 'typeorm';
import { VideoEntity } from './video.entiti';
import { UserDto } from 'src/user/user.dto';
import { videoDta } from './video.dto';

@Injectable()
export class VideoService {
  constructor(
    @InjectRepository(VideoEntity)
    private readonly videoRepository: Repository<VideoEntity>,
  ) {}

    async byID(id:number,isPublick = false){
      const video = await this.videoRepository.findOne({
        where: isPublick ? {id,isPublic:true} : {
          id
        },
        relations: {
          user: true,
          comments: {user:true}
        },
        select: {
          user: {
            id:true,
            name:true,
            avatarPath:true,
            isVerified:true,
            subscribersCount:true,
            subscriptions:true
          },
          comments: {
            message:true,
            id:true,
            user: {
              id:true,
              name:true,
              avatarPath:true,
              isVerified:true,
              subscriptions:true
            }
          }
       },
      })

      if(!video) throw new NotFoundException('Видео не найден')
      return video
    }

    async update(id:number,dto:videoDta){
      const video = await this.byID(id)


      return this.videoRepository.save({...video, ...dto})
      
    }

    async getAll(searchTerm?:string){
      let option:FindOptionsWhereProperty<VideoEntity> = {}
      if(searchTerm)

      option = {
        name: ILike(`%${searchTerm}%`)
      }

      return this.videoRepository.find({
        where: {
          ...option,
          isPublic:true
        },
        order: {
          createAt: 'DESC'
        },
        relations: {
          user:true,
          comments: {
            user:true
          }
        },
        select: {
          user: {
            id:true,
            name:true,
            avatarPath:true,
            isVerified:true
          }
        }
      })
    }


    async getMostPopular(){
      return this.videoRepository.find({
        where: {
          views: MoreThan(0)
        },
          relations: {
          user:true
        },
        select: {
          user: {
            id:true,
            name:true,
            avatarPath:true,
            isVerified:true
          }
        },
        order: {
          views: -1
        }
      })
    }


    async create(userId:number) {
      const defoultValues = {
        name: '',
        user: {id:userId},
        description: '',
        videoPath: '',
        thumnailPath: ''
      }


      const newVideo = this.videoRepository.create(defoultValues)
      const video = await this.videoRepository.save(newVideo)
      return video.id
    }


    async delete (id:number){
      return this.videoRepository.delete({id})
    }

    async updateCountViews(id:number){
      const videos = await this.byID(id)
      videos.views++
      return await this.videoRepository.save(videos)
    }

    async updateLike(id:number){
      const videos = await this.byID(id)
      videos.likes++
      return await this.videoRepository.save(videos)
    }

}
