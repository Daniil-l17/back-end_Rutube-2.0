import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

export abstract class Base {
  @PrimaryGeneratedColumn()
  id:number

  @CreateDateColumn({name: 'created_at'})
  createAt: Date

  @UpdateDateColumn({name: 'updateted_at'})
  updatedAt: Date
}