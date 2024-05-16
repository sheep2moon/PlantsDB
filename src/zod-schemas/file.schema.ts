import { z } from "zod";

export const customFile = z.object({
    name: z.string(),
    size: z.number(),
    type: z.string()
});
