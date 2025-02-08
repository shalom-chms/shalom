import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { initializeFirebase } from './config/firebase.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor() {
    // Initialize Firebase Admin
    initializeFirebase();
  }
}
