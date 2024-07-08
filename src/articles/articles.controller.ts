import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ArticleEntity } from './entities/article.entity';

@Controller('articles')
@ApiTags('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @ApiCreatedResponse({type: ArticleEntity})
  @Post()
  async create(@Body() createArticleDto: CreateArticleDto) {
    return new ArticleEntity(await this.articlesService.create(createArticleDto));
  }

  @ApiOkResponse({type: ArticleEntity, isArray: true})
  @Get()
 async findAll() {
    const articles = await this.articlesService.findAll();

    return articles.map((article) => new ArticleEntity(article));
  }

  @ApiOkResponse({type: ArticleEntity, isArray: true})
  @Get('drafts')
  async findDrafts() {
    const drafts = await this.articlesService.findDrafts();

    return drafts.map((draft) => new ArticleEntity(draft));
  }

  @ApiOkResponse({type: ArticleEntity})
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return new ArticleEntity(await this.articlesService.findOne(id));
  }

  @ApiOkResponse({type: ArticleEntity})
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
    return new ArticleEntity(await this.articlesService.update(id, updateArticleDto));
  }

  @ApiOkResponse({type: ArticleEntity})
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return new ArticleEntity(await this.articlesService.remove(id));
  }
}
