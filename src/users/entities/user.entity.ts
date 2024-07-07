import { ApiProperty } from '@nestjs/swagger'
import { User } from '@prisma/client'
import { Exclude } from 'class-transformer'

export class UserEntity implements User {
  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial)
  }
  @ApiProperty()
  id: string

  @ApiProperty({ required: false, nullable: true })
  name: string

  @ApiProperty()
  email: string

  @Exclude()
  password: string

  @ApiProperty()
  createdAt: Date

  @ApiProperty()
  updatedAt: Date
}
