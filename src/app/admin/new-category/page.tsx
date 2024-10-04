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
import { onNewCategorySubmit } from "./actions";
import { cn } from "../../../lib/utils";

type FormSchema = z.infer<typeof newCategorySchema>;

export default function NewCategoryPage() {
    const form = useForm<FormSchema>({
        resolver: zodResolver(newCategorySchema),
        defaultValues: {
            name: "",
            description: ""
        }
    });

    const onSubmit = form.handleSubmit(async (data: FormSchema) => {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("icon", data.icon as File);
        onNewCategorySubmit(formData);
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
                                    <div className="max-w-48">
                                        <ImageInput onFileAdd={file => form.setValue("icon", file)} className={cn(form.getValues("icon") && "hidden")} />
                                        {field.value && (
                                            <div className="relative rounded-sm overflow-hidden bg-primary-foreground w-full aspect-square">
                                                <Image fill className="object-contain" alt="" src={URL.createObjectURL(field.value)} />
                                                <Button onClick={() => form.setValue("icon", undefined)} type="button" className="absolute top-2 right-2 w-8 h-8 opacity-30 hover:opacity-100">
                                                    X
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <Button className="mt-4" type="submit">
                        Zatwierdź
                    </Button>
                </form>
            </Form>
        </div>
    );
}
