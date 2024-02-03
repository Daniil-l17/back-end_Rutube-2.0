import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";


export const getTypeOrmConfig = async (configService:ConfigService):Promise<TypeOrmModuleOptions> => ({
  type: 'postgres',
  host: 'localhost',
  port: configService.get('PORT_MAIN'),
  database: configService.get('DATABASE_MAIN'),
  username: configService.get('USERNAME_MAIN'),
  password: configService.get('PASSWORD_MAIN'),
  autoLoadEntities: true,
  synchronize: true
})