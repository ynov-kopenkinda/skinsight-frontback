import { bigint, index, varchar } from "drizzle-orm/mysql-core";

import { mySqlTable } from "./_table";

export const items = mySqlTable(
  "item",
  {
    id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
    name: varchar("name", { length: 256 }),
  },
  (item) => ({
    nameIndex: index("name_idx").on(item.name),
  }),
);
