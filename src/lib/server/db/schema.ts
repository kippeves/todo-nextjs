import { relations } from "drizzle-orm/relations";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

/*
    DB Entities
*/

export type todoDto = typeof todos.$inferSelect;

export const todos = sqliteTable("todos", {
    id: integer().primaryKey(),
    value: text().notNull(),
    description: text().notNull(),
    finished: integer().default(0),
    alarmDate: integer().default(0),
    priority: integer().default(0)
});

export const tags = sqliteTable("tags", {
    id: integer().primaryKey(),
    name: text().notNull(),
    todoId: integer()
})

/*
    DB Relations
*/

export const todosRelations = relations(todos, ({ one, many }) => ({
    tags: many(tags),
}));

export const tagsRelations = relations(tags, ({ one }) => ({
    todo: one(todos, {
        fields: [tags.todoId],
        references: [todos.id]
    }),
}));
