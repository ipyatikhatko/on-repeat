import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { SearchService } from './search.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';

@ApiTags('Search')
@Controller('search')
@UseGuards(JwtAuthGuard)
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get('posts/tags')
  @ApiOperation({ summary: 'Search posts by tags' })
  @ApiQuery({ name: 'tags', type: String, isArray: true })
  async searchPostsByTags(
    @Query('tags') tags: string[],
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 20,
  ) {
    return this.searchService.searchPostsByTags(tags, page, limit);
  }

  @Get('posts/text')
  @ApiOperation({ summary: 'Search posts by text content' })
  async searchPostsByText(
    @Query('q') searchText: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 20,
  ) {
    return this.searchService.searchPostsByText(searchText, page, limit);
  }

  @Get('users')
  @ApiOperation({ summary: 'Search users by username' })
  async searchUsers(
    @Query('username') username: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 20,
  ) {
    return this.searchService.searchUsers(username, page, limit);
  }
}
