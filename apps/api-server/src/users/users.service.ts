import { Inject, Injectable } from '@nestjs/common';
import { DATABASE, Database } from '../common/db.provider';
import { eq } from '@skinsight/db-secure';

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

  findOneByEmail(
    email: string,
  ): Promise<Database['schema']['users']['$inferSelect'][]> {
    return this.db
      .select()
      .from(this.usersSchema)
      .where(eq(this.usersSchema.email, email));
  }

  async createUser(data: newUser): Promise<newUser> {
    const newUser = await this.db.insert(this.usersSchema).values(data);
    return newUser[0];
  }

  async updateUser(
    email: string,
    data: Partial<newUser>,
  ): Promise<Database['schema']['users']['$inferSelect'][]> {
    await this.db
      .update(this.usersSchema)
      .set(data)
      .where(eq(this.usersSchema.email, email));
    return this.findOneByEmail(email);
  }

  async deleteUser(email: string): Promise<void> {
    await this.db
      .delete(this.usersSchema)
      .where(eq(this.usersSchema.email, email));
  }
}
