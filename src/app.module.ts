import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmConfig } from './config/typeorm.config';
import { EventsModule } from 'src/domains/events/events.module';
import { EventsWinnersModule } from './domains/events-winners/events-winners.module';

@Module({
  imports: [TypeOrmModule.forRoot(TypeOrmConfig), EventsModule, EventsWinnersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
