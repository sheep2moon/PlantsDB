"use client";
import { z } from "zod";
import { newCategorySchema } from "../../../zod-schemas/new-category.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../../components/ui/form";
import { useTransition } from "react";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import ImageInput from "../../../components/ui/image-input";
import Image from "next/image";
import { Button } from "../../../components/ui/button";

type FormData = z.infer<typeof newCategorySchema>;

export default function NewCategoryPage() {
    const [pending, startTransition] = useTransition();
    const form = useForm<FormData>({
        resolver: zodResolver(newCategorySchema),
        defaultValues: {
            name: "",
            description: ""
        }
    });

    const onSubmit = form.handleSubmit(async (formData: FormData) => {
        startTransition(() => {
            console.log("submitting", formData);
        });
    });

    return (
        <div className="py-8 px-2 max-w-screen-md mx-auto">
            <Form {...form}>
                <form onSubmit={onSubmit}>
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nazwa</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Opis</FormLabel>
                                <FormControl>
                                    <Textarea {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="icon"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Ikona</FormLabel>
                                <FormControl className="">
                                    <div className="grid grid-cols-3 gap-2">
                                        <ImageInput onFileAdd={file => form.setValue("icon", file)} />
                                        {field.value && (
                                            <div className="relative rounded-sm overflow-hidden bg-primary-foreground">
                                                <Image fill className="object-contain" alt="" src={URL.createObjectURL(field.value)} />
                                            </div>
                                        )}
                                    </div>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <Button className="mt-4" type="submit" disabled={pending}>
                        Zatwierdź
                    </Button>
                </form>
            </Form>
        </div>
    );
}
