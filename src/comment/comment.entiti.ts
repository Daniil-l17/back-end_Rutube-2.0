import { SubscriptionEntity } from "src/user/subscription.entiti";
import { UserEntity } from "src/user/user.entiti";
import { Base } from "src/utils/base";
import { VideoEntity } from "src/video/video.entiti";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";

@Entity('Comment')
export class CommentEntity extends Base {

  @Column({type:'text'})
  message: string


  @ManyToOne(() => UserEntity)
  @JoinColumn({name:'user_id'})
  user: UserEntity

  @ManyToOne(() => VideoEntity,video => video.comments)
  @JoinColumn({name:'video_id'})
  video: VideoEntity


}