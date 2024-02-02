// src/common/db.providers.ts

/* eslint-disable @typescript-eslint/consistent-type-imports */
export const DATABASE = 'DATABASE_PROVIDER';
export const DATABASE_SECURE = 'DATABASE_SECURE_PROVIDER';

type DbFactoryReturnType = Promise<typeof import('@skinsight/db')>;
type DbSecureFactoryReturnType = Promise<typeof import('@skinsight/db-secure')>;

export const dbFactory = async (): DbFactoryReturnType => {
  const module = await import('@skinsight/db');
  return module;
};

export const dbSecureFactory = async (): DbSecureFactoryReturnType => {
  const module = await import('@skinsight/db-secure');
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

export type Database = Awaited<ReturnType<typeof dbFactory>>;
export type DatabaseSecure = Awaited<ReturnType<typeof dbSecureFactory>>;
