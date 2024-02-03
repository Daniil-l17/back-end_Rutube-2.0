import { IsEmail, IsString } from "class-validator"

export class videoDta {

  @IsString()
  name:string

  isPublick?:boolean

  @IsString()
  description:string

  @IsString()
  videoPath:string

  @IsString()
  thumbnaulPath:string

}
