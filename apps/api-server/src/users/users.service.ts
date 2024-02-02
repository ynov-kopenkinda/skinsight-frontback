import { Inject, Injectable } from '@nestjs/common';
import { DATABASE, Database } from '../common/db.provider';

export type newUser = Database['schema']['users']['$inferInsert'];
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

  findOneByAnonId(
    anonId: string,
  ): Promise<Database['schema']['users']['$inferSelect'][]> {
    return this.db.select().from(this.usersSchema);
  }

  async createUser(data: newUser): Promise<newUser> {
    const newUser = await this.db.insert(this.usersSchema).values(data);
    return newUser[0];
  }
}
