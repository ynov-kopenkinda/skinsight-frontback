import { Inject, Injectable } from '@nestjs/common';
import { DATABASE, Database } from '../common/db.provider';
import { uuid } from 'uuidv4';
import { users } from 'node_modules/@skinsight/db/schema/auth';

@Injectable()
export class UsersService {
  private db: Database['db'];
  private usersSchema: Database['schema']['users'];

  constructor(
    @Inject(DATABASE)
    db: Database,
  ) {
    this.db = db.db;
    this.usersSchema = db.schema.users;
  }

  findAll(): Promise<Database['schema']['users']['$inferSelect'][]> {
    return this.db.select().from(this.usersSchema);
  }
}
