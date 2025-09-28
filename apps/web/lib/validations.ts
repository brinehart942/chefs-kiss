import { z } from "zod";

// Auth schemas
export const signUpSchema = z
  .object({
    fullName: z.string().min(3, "Full name must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
    avatar: z.string().optional(),
    bio: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

// Recipe schemas
export const recipeSchema = z.object({
  title: z
    .string()
    .min(2, "Title must be at least 2 characters")
    .max(100, "Title must be less than 100 characters"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(1000, "Description must be less than 1000 characters"),
  instructions: z
    .array(
      z.object({
        step: z.number().min(1),
        instruction: z
          .string()
          .min(5, "Instruction must be at least 5 characters"),
        image: z.string().optional(),
      })
    )
    .min(1, "At least one instruction is required"),
  ingredients: z
    .array(
      z.object({
        name: z.string().min(1, "Ingredient name is required"),
        amount: z.string().min(1, "Amount is required"),
        unit: z.string().min(1, "Unit is required"),
        notes: z.string().optional(),
      })
    )
    .min(1, "At least one ingredient is required"),
  prepTime: z.coerce.number().min(0, "Prep time must be 0 or greater"),
  cookTime: z.coerce.number().min(0, "Cook time must be 0 or greater"),
  servings: z.coerce.number().min(1, "Servings must be at least 1"),
  difficulty: z.enum(["EASY", "MEDIUM", "HARD", "EXPERT"]),
  cuisine: z.enum([
    "AMERICAN",
    "ITALIAN",
    "MEXICAN",
    "ASIAN",
    "INDIAN",
    "FRENCH",
    "MEDITERRANEAN",
    "OTHER",
  ]),
  tags: z.array(z.string()).optional(),
  imageUrl: z.string().url("Invalid image URL"),
  videoUrl: z.string().url("Invalid video URL").optional(),
  nutritionInfo: z
    .object({
      calories: z.number().optional(),
      protein: z.number().optional(),
      carbs: z.number().optional(),
      fat: z.number().optional(),
      fiber: z.number().optional(),
      sugar: z.number().optional(),
    })
    .optional(),
  isPublic: z.boolean().default(true),
});

// Collection schemas
export const collectionSchema = z.object({
  name: z
    .string()
    .min(1, "Collection name is required")
    .max(100, "Name must be less than 100 characters"),
  description: z
    .string()
    .max(500, "Description must be less than 500 characters")
    .optional(),
  isPublic: z.boolean().default(false),
});

// Review schemas
export const reviewSchema = z.object({
  rating: z.coerce
    .number()
    .min(1, "Rating must be at least 1")
    .max(5, "Rating must be at most 5"),
  comment: z
    .string()
    .max(1000, "Comment must be less than 1000 characters")
    .optional(),
});

// Pantry item schemas
export const pantryItemSchema = z.object({
  name: z
    .string()
    .min(1, "Item name is required")
    .max(100, "Name must be less than 100 characters"),
  category: z
    .string()
    .min(1, "Category is required")
    .max(50, "Category must be less than 50 characters"),
  quantity: z.coerce.number().min(0, "Quantity must be 0 or greater"),
  unit: z
    .string()
    .min(1, "Unit is required")
    .max(20, "Unit must be less than 20 characters"),
  expiryDate: z.string().optional(),
});

// Meal plan schemas
export const mealPlanSchema = z.object({
  name: z
    .string()
    .min(1, "Meal plan name is required")
    .max(100, "Name must be less than 100 characters"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
});

export const mealPlanItemSchema = z.object({
  recipeId: z.string().uuid("Invalid recipe ID"),
  dayOfWeek: z.coerce.number().min(0).max(6),
  mealType: z.enum(["breakfast", "lunch", "dinner", "snack"]),
  servings: z.coerce.number().min(1, "Servings must be at least 1"),
});

// Type exports
export type SignUpData = z.infer<typeof signUpSchema>;
export type SignInData = z.infer<typeof signInSchema>;
export type RecipeData = z.infer<typeof recipeSchema>;
export type CollectionData = z.infer<typeof collectionSchema>;
export type ReviewData = z.infer<typeof reviewSchema>;
export type PantryItemData = z.infer<typeof pantryItemSchema>;
export type MealPlanData = z.infer<typeof mealPlanSchema>;
export type MealPlanItemData = z.infer<typeof mealPlanItemSchema>;
