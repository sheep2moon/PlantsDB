import { z } from "zod";

export const customFile = z.object({
    name: z.string(),
    size: z.number(),
    type: z.string()
});

export const fileSchema = z.custom<File>(
    file => {
        const isFile = file instanceof File;

        return isFile;
    },
    { message: "Plik nieprawidłowy" }
);
