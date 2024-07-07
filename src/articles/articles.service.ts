import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateArticleDto } from './dto/create-article.dto'
import { UpdateArticleDto } from './dto/update-article.dto'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class ArticlesService {
  constructor(private prisma: PrismaService) {}
  create(createArticleDto: CreateArticleDto) {
    return this.prisma.article.create({ data: createArticleDto })
  }

  findAll() {
    return this.prisma.article.findMany({ where: { published: true } })
  }

  async findOne(id: string) {
    const article = await this.prisma.article.findFirst({
      where: { id },
      include: { author: true },
    })

    if (!article) {
      throw new NotFoundException(`Article with id ${id} not found`)
    }

    return article
  }

  findDrafts() {
    return this.prisma.article.findMany({ where: { published: false } })
  }

  update(id: string, updateArticleDto: UpdateArticleDto) {
    return this.prisma.article.update({ where: { id }, data: updateArticleDto })
  }

  remove(id: string) {
    return this.prisma.article.delete({ where: { id } })
  }
}
