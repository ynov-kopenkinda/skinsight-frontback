// src/database/database.module.ts

import { Module } from '@nestjs/common';

import { dbProvider, dbSecureProvider } from './common/db.provider';

@Module({
  imports: [],
  providers: [dbProvider, dbSecureProvider],
  exports: [dbProvider, dbSecureProvider],
})
export class DatabaseModule {}
