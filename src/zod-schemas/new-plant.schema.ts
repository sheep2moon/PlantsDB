import { z } from "zod";
import { customFile } from "./file.schema";
import { prefferedStanding } from "../db/schema";

export const newPlantSchema = z.object({
    name: z.string(),
    description: z.string(),
    alt_names: z.array(z.string()),
    images: z.array(customFile).min(1, "Zdjęcie jest wymagane"),
    preffered_standing: z.array(z.enum(prefferedStanding.enumValues)),
    water_needs: z.number().min(1).max(5),
    performance: z.number().min(1).max(5),
    height: z.array(z.number().min(1).max(200)).length(2).default([20, 30]),
    earliness: z.number().min(1).max(5),
    flowering_months: z.array(z.number().min(1).max(12)).length(2).default([4, 10]),
    hints: z.string()
});