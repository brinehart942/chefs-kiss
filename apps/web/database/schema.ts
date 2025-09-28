import {
  varchar,
  uuid,
  integer,
  text,
  pgTable,
  date,
  pgEnum,
  timestamp,
  boolean,
  json,
} from "drizzle-orm/pg-core";

// Enums
export const STATUS_ENUM = pgEnum("status", [
  "PENDING",
  "APPROVED",
  "REJECTED",
  "DRAFT",
]);
export const ROLE_ENUM = pgEnum("role", [
  "UNAUTHENTICATED",
  "MEMBER_FREE",
  "MEMBER_PLUS",
  "MEMBER_PRO",
  "CREATOR_FREE",
  "CREATOR_PLUS",
  "CHEF_PRO",
  "CHEF_PRO_PLUS",
  "TEAMS_OWNER",
  "TEAMS_MEMBER",
  "ADMIN",
]);
export const DIFFICULTY_ENUM = pgEnum("difficulty", [
  "EASY",
  "MEDIUM",
  "HARD",
  "EXPERT",
]);
export const CUISINE_ENUM = pgEnum("cuisine", [
  "AMERICAN",
  "ITALIAN",
  "MEXICAN",
  "ASIAN",
  "INDIAN",
  "FRENCH",
  "MEDITERRANEAN",
  "OTHER",
]);

// Users table
export const users = pgTable("users", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  fullName: varchar("full_name", { length: 255 }).notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  avatar: text("avatar"),
  bio: text("bio"),
  role: ROLE_ENUM("role").default("MEMBER_FREE"),
  status: STATUS_ENUM("status").default("PENDING"),
  lastActivityDate: date("last_activity_date").defaultNow(),
  createdAt: timestamp("created_at", {
    withTimezone: true,
  }).defaultNow(),
  updatedAt: timestamp("updated_at", {
    withTimezone: true,
  }).defaultNow(),
});

// Recipes table
export const recipes = pgTable("recipes", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  instructions: json("instructions").notNull(), // Array of step objects
  ingredients: json("ingredients").notNull(), // Array of ingredient objects
  prepTime: integer("prep_time").notNull(), // in minutes
  cookTime: integer("cook_time").notNull(), // in minutes
  servings: integer("servings").notNull(),
  difficulty: DIFFICULTY_ENUM("difficulty").notNull(),
  cuisine: CUISINE_ENUM("cuisine").notNull(),
  tags: json("tags").notNull(), // Array of strings
  imageUrl: text("image_url").notNull(),
  videoUrl: text("video_url"),
  nutritionInfo: json("nutrition_info"), // Object with calories, protein, etc.
  isPublic: boolean("is_public").default(true),
  isFeatured: boolean("is_featured").default(false),
  viewCount: integer("view_count").default(0),
  rating: integer("rating").default(0),
  ratingCount: integer("rating_count").default(0),
  authorId: uuid("author_id")
    .references(() => users.id)
    .notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

// Collections table (for saved recipes)
export const collections = pgTable("collections", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  isPublic: boolean("is_public").default(false),
  userId: uuid("user_id")
    .references(() => users.id)
    .notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

// Collection items (many-to-many relationship between collections and recipes)
export const collectionItems = pgTable("collection_items", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  collectionId: uuid("collection_id")
    .references(() => collections.id)
    .notNull(),
  recipeId: uuid("recipe_id")
    .references(() => recipes.id)
    .notNull(),
  addedAt: timestamp("added_at", { withTimezone: true }).defaultNow(),
});

// Reviews table
export const reviews = pgTable("reviews", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  rating: integer("rating").notNull(), // 1-5 stars
  comment: text("comment"),
  userId: uuid("user_id")
    .references(() => users.id)
    .notNull(),
  recipeId: uuid("recipe_id")
    .references(() => recipes.id)
    .notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

// Follows table (for following chefs)
export const follows = pgTable("follows", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  followerId: uuid("follower_id")
    .references(() => users.id)
    .notNull(),
  followingId: uuid("following_id")
    .references(() => users.id)
    .notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

// Pantry items table
export const pantryItems = pgTable("pantry_items", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  name: varchar("name", { length: 255 }).notNull(),
  category: varchar("category", { length: 100 }).notNull(),
  quantity: integer("quantity").notNull(),
  unit: varchar("unit", { length: 50 }).notNull(),
  expiryDate: date("expiry_date"),
  userId: uuid("user_id")
    .references(() => users.id)
    .notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

// Meal plans table
export const mealPlans = pgTable("meal_plans", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  name: varchar("name", { length: 255 }).notNull(),
  startDate: date("start_date").notNull(),
  endDate: date("end_date").notNull(),
  userId: uuid("user_id")
    .references(() => users.id)
    .notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

// Meal plan items (recipes assigned to specific days/meals)
export const mealPlanItems = pgTable("meal_plan_items", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  mealPlanId: uuid("meal_plan_id")
    .references(() => mealPlans.id)
    .notNull(),
  recipeId: uuid("recipe_id")
    .references(() => recipes.id)
    .notNull(),
  dayOfWeek: integer("day_of_week").notNull(), // 0-6 (Sunday-Saturday)
  mealType: varchar("meal_type", { length: 50 }).notNull(), // breakfast, lunch, dinner, snack
  servings: integer("servings").notNull().default(1),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});
