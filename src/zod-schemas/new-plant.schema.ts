import { z } from "zod";
import { fileSchema } from "./file.schema";
import { prefferedStanding } from "../db/schema";

export const newPlantSchema = z.object({
    name: z.string().min(4, "Nazwa powinna być dłuższa"),
    description: z.string().min(20, "Opis powinien być dłuższy niż 20 znaków."),
    alt_names: z.array(z.string()).optional(),
    images: z.array(fileSchema).min(1, "Zdjęcie jest wymagane"),
    preffered_standing: z.array(z.enum(prefferedStanding.enumValues)),
    water_needs: z.number().min(1).max(5),
    performance: z.number().min(1).max(5),
    height: z.array(z.number().min(1).max(200)).length(2).default([20, 30]),
    flowering_months: z.array(z.number().min(1).max(12)).length(2).default([4, 10]),
    hints: z.string()
});
