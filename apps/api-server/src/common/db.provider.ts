// src/common/db.providers.ts

/* eslint-disable @typescript-eslint/consistent-type-imports */
export const DATABASE = 'DATABASE_PROVIDER';
export const DATABASE_SECURE = 'DATABASE_SECURE_PROVIDER';
import db from '@skinsight/db';
import db_pd from '@skinsight/db-secure';

type DbFactoryReturnType = Promise<typeof db>;
type DbSecureFactoryReturnType = Promise<typeof db_pd>;

export const dbFactory = async (): DbFactoryReturnType => {
  const module = await db;
  return module;
};

export const dbSecureFactory = async (): DbSecureFactoryReturnType => {
  const module = await db_pd;
  return module;
};

export const dbProvider = {
  provide: DATABASE,
  useFactory: dbFactory,
};

export const dbSecureProvider = {
  provide: DATABASE_SECURE,
  useFactory: dbFactory,
};

export type Database = typeof db;
export type DatabaseSecure = typeof db_pd;
