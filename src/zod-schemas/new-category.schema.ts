import { z } from "zod";
import { fileSchema } from "./file.schema";

export const newCategorySchema = z.object({
    name: z.string().min(4, "Nazwa musi być dłuższa niż 4 znaki"),
    description: z.string().min(30, "Opis musi być dłuższy niż 30 znaków"),
    icon: fileSchema.optional().refine(file => file !== null, "Zdjęcie kategorii jest wymagane")
});
