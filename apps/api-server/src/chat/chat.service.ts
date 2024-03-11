import { Inject, Injectable } from '@nestjs/common';
import { DATABASE, Database } from '../common/db.provider';
import { eq } from 'drizzle-orm';

@Injectable()
export class ChatService {
  private db: Database['db'];
  private chatSchema: Database['schema']['chat'];

  constructor(
    @Inject(DATABASE)
    db: Database,
  ) {
    this.db = db.db;
    this.chatSchema = db.schema.chat;
  }

  findAll(): Promise<Database['schema']['chat']['$inferSelect'][]> {
    return this.db.select().from(this.chatSchema);
  }

  findOneById(
    id: string,
  ): Promise<Database['schema']['chat']['$inferSelect'][]> {
    return this.db
      .select()
      .from(this.chatSchema)
      .where(eq(this.chatSchema.id, id));
  }

  async createChat(
    data: Database['schema']['chat']['$inferInsert'],
  ): Promise<Database['schema']['chat']['$inferInsert']> {
    const newChat = await this.db.insert(this.chatSchema).values(data);
    return newChat[0];
  }

  async updateChat(
    id: string,
    data: Partial<Database['schema']['chat']['$inferInsert']>,
  ): Promise<Database['schema']['chat']['$inferSelect'][]> {
    await this.db
      .update(this.chatSchema)
      .set(data)
      .where(eq(this.chatSchema.id, id));
    return this.findOneById(id);
  }

  async deleteChat(id: string): Promise<void> {
    await this.db.delete(this.chatSchema).where(eq(this.chatSchema.id, id));
  }
}
