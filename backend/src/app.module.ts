import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { FeedModule } from './feed/feed.module';
import { SearchModule } from './search/search.module';

@Module({
  imports: [AuthModule, UserModule, FeedModule, SearchModule],
})
export class AppModule {}
