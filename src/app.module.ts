import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';
// import { MongooseModule } from '@nestjs/mongoose';
// MongooseModule.forRoot('mongodb://localhost/nest'),

@Module({
  imports: [TaskModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
