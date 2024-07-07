import { Article } from '@prisma/client'
import { ApiProperty } from '@nestjs/swagger'
import { UserEntity } from 'src/users/entities/user.entity'

export class ArticleEntity implements Article {
  @ApiProperty()
  id: string

  @ApiProperty()
  title: string

  @ApiProperty({ required: false, nullable: true })
  description: string | null

  @ApiProperty()
  body: string

  @ApiProperty({ required: false, default: false })
  published: boolean

  @ApiProperty()
  createdAt: Date

  @ApiProperty()
  updatedAt: Date

  @ApiProperty({ required: false, nullable: true })
  authorId: string | null

  @ApiProperty({ required: false, type: UserEntity })
  author?: UserEntity

  constructor({ author, ...data }: Partial<ArticleEntity>) {
    Object.assign(this, data)

    if (author) {
      this.author = new UserEntity(author)
    }
  }
}
