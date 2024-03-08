import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from './user.entiti';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubscriptionEntity } from './subscription.entiti';
import { UserDto } from './user.dto';
import { genSalt, hash } from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(SubscriptionEntity)
    private readonly subscriptionRepository: Repository<SubscriptionEntity>,
  ) {}

    async byID(id:number){
      const user = await this.userRepository.findOne({
        where: {
          id
        },
        relations: {
          videos: true,
          subscriptions: {toChannel:true}
        },
        order: {
          createAt: 'DESC'
        }
      })

      if(!user) throw new NotFoundException('Пользователь не найден')
      return user
    }

    async upDateProfile(id:number,dto:UserDto){
      const user = await this.byID(id)
      const isSameUser = await this.userRepository.findOneBy({email:dto.email})
      if(isSameUser && id !== isSameUser.id) throw new BadRequestException(
        'Email занят'
      )

      
      user.email = dto.email
      user.name = dto.name
      user.description = dto.description
      user.avatarPath = dto.avatarPath
      user.profileUrl = dto.profileUrl
      return this.userRepository.save(user)
      
    }

  async subscribe(id:number,channelId:number){

    const data = {
      toChannel: {id:channelId},
      fromUser: {id}
    }

    const isSubscribed = await this.subscriptionRepository.findOneBy(data)

      if(!isSubscribed){
        const newSubscription = await this.subscriptionRepository.create(data)
        await this.subscriptionRepository.save(newSubscription)
        return true
      }

      
      await this.subscriptionRepository.delete(data)
      return false
  }

    async getAll(){
      return this.userRepository.find()
    }


}
