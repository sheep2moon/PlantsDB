import { integer, json, pgEnum, pgTable, primaryKey, smallint, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { plant_features } from "../lib/const/plant-features";
import { generateId } from "../lib/utils";
import { AdapterAccount } from "next-auth/adapters";
import { table } from "console";

export const prefferedStanding = pgEnum("standing", ["Słoneczne", "Półcień", "Cień"]);
export const plantFeatures = pgEnum("plant_features", [Object.keys(plant_features)[0], ...Object.keys(plant_features)]);

type IntRange = {
    from: number;
    to: number;
};

/**
 * NEXT-AUTH TABLES
 */
export const users = pgTable("user", {
    id: text("id").notNull().primaryKey(),
    name: text("name"),
    email: text("email").notNull(),
    emailVerified: timestamp("emailVerified", { mode: "date" }),
    image: text("image")
});

export const accounts = pgTable(
    "account",
    {
        userId: text("userId")
            .notNull()
            .references(() => users.id, { onDelete: "cascade" }),
        type: text("type").$type<AdapterAccount["type"]>().notNull(),
        provider: text("provider").notNull(),
        providerAccountId: text("providerAccountId").notNull(),
        refresh_token: text("refresh_token"),
        access_token: text("access_token"),
        expires_at: integer("expires_at"),
        token_type: text("token_type"),
        scope: text("scope"),
        id_token: text("id_token"),
        session_state: text("session_state")
    },
    account => ({
        primaryKey: [account.provider, account.providerAccountId]
    })
);

export const sessions = pgTable("session", {
    sessionToken: text("sessionToken").notNull().primaryKey(),
    userId: text("userId")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    expires: timestamp("expires", { mode: "date" }).notNull()
});

export const verificationTokens = pgTable(
    "verificationToken",
    {
        identifier: text("identifier").notNull(),
        token: text("token").notNull(),
        expires: timestamp("expires", { mode: "date" }).notNull()
    },
    vt => ({
        primaryKey: [vt.identifier, vt.token]
    })
);

/**
 * APP TABLES
 */

export const PlantTable = pgTable("plant", {
    id: varchar("id", { length: 12 }).primaryKey().$defaultFn(generateId).notNull(),
    name: text("name").notNull(),
    alt_names: text("alt_names"),
    description: text("description").notNull(),
    hints: text("hints"),
    flowering_months: json("flowering_months").$type<IntRange>().default({ from: 4, to: 10 }),
    earliness: smallint("earliness").default(2),
    height: json("height").$type<IntRange>().default({ from: 25, to: 40 }),
    water_needs: smallint("water_needs").notNull().default(1),
    performance: smallint("performance").default(2),
    preffered_standing: prefferedStanding("preffered_standing").notNull().default("Słoneczne")
});

export const PlantVariantsTable = pgTable(
    "plantVariants",
    {
        plant_id: varchar("plant_id", { length: 12 })
            .references(() => PlantTable.id)
            .notNull(),
        variant_id: varchar("plant_id", { length: 12 })
            .references(() => PlantTable.id)
            .notNull()
    },
    table => {
        return {
            pk: primaryKey({ columns: [table.plant_id, table.variant_id] })
        };
    }
);

export const PlantFeatureTable = pgTable("plantFeature", {
    id: varchar("id", { length: 12 }).primaryKey().$defaultFn(generateId).notNull(),
    title: text("title").notNull(),
    description: text("description"),
    icon_url: text("icon_url")
});

export const PlantWithFeatureTable = pgTable(
    "plantWithFeature",
    {
        plant_id: varchar("plant_id", { length: 12 })
            .references(() => PlantTable.id)
            .notNull(),
        feature_id: varchar("feature_id", { length: 12 })
            .references(() => PlantFeatureTable.id)
            .notNull()
    },
    table => {
        return {
            pk: primaryKey({ columns: [table.plant_id, table.feature_id] })
        };
    }
);

export const VegetableTable = pgTable("vegetable", {
    id: varchar("id", { length: 12 }).primaryKey().$defaultFn(generateId),
    name: text("name").notNull(),
    alt_names: text("alt_names"),
    description: text("description").notNull(),
    harvest_months: json("harvest_months").$type<IntRange>().default({ from: 6, to: 8 }),
    water_needs: smallint("water_needs").notNull().default(1),
    earliness: smallint("earliness").default(2)
});

export type Plant = typeof PlantTable.$inferSelect;