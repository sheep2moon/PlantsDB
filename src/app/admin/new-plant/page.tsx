import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { newPlantSchema } from "../../../zod-schemas/new-plant.schema";

type FormData = z.infer<typeof newPlantSchema>;

export default function NewPlantPage() {
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        watch,
        formState: { errors }
    } = useForm<FormData>({
        resolver: zodResolver(newPlantSchema),
        defaultValues: { images: [] }
    });

    return <div>New Plant Form</div>;
}
