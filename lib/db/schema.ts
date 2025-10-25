import { pgTable, text, timestamp, boolean, index, uniqueIndex } from "drizzle-orm/pg-core";

export const user = pgTable(
    'user',
    {
      id: text('id').primaryKey(),
      name: text('name').notNull(),
      email: text('email').notNull().unique(),
      emailVerified: boolean('emailVerified').notNull().default(false),
      image: text('image'),
      createdAt: timestamp('createdAt').notNull().defaultNow(),
      updatedAt: timestamp('updatedAt').notNull().defaultNow(),
    },
    (table) => [
      uniqueIndex('user_email_idx').on(table.email),
    ]
  );
  
  export const session = pgTable(
    'session',
    {
      id: text('id').primaryKey(),
      expiresAt: timestamp('expiresAt').notNull(),
      token: text('token').notNull().unique(),
      createdAt: timestamp('createdAt').notNull().defaultNow(),
      updatedAt: timestamp('updatedAt').notNull().defaultNow(),
      ipAddress: text('ipAddress'),
      userAgent: text('userAgent'),
      userId: text('userId')
        .notNull()
        .references(() => user.id, { onDelete: 'cascade' }),
    },
    (table) => [index('session_user_id_idx').on(table.userId)]
  );
  
  export const account = pgTable(
    'account',
    {
      id: text('id').primaryKey(),
      accountId: text('accountId').notNull(),
      providerId: text('providerId').notNull(),
      userId: text('userId')
        .notNull()
        .references(() => user.id, { onDelete: 'cascade' }),
      accessToken: text('accessToken'),
      refreshToken: text('refreshToken'),
      idToken: text('idToken'),
      accessTokenExpiresAt: timestamp('accessTokenExpiresAt'),
      refreshTokenExpiresAt: timestamp('refreshTokenExpiresAt'),
      scope: text('scope'),
      password: text('password'), // For email/password auth
      createdAt: timestamp('createdAt').notNull().defaultNow(),
      updatedAt: timestamp('updatedAt').notNull().defaultNow(),
    },
    (table) => [index('account_user_id_idx').on(table.userId)]
  );
  
  export const verification = pgTable('verification', {
    id: text('id').primaryKey(),
    identifier: text('identifier').notNull(),
    value: text('value').notNull(),
    expiresAt: timestamp('expiresAt').notNull(),
    createdAt: timestamp('createdAt').notNull().defaultNow(),
    updatedAt: timestamp('updatedAt').notNull().defaultNow(),
  });