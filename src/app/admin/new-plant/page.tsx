"use client";

import { z } from "zod";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { newPlantSchema } from "../../../zod-schemas/new-plant.schema";
import { Textarea } from "../../../components/ui/textarea";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Button } from "../../../components/ui/button";
import { useEffect, useTransition } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../../components/ui/form";
import { Slider } from "../../../components/ui/slider";
import { polish_month_names } from "../../../lib/const/const";
import { prefferedStanding } from "../../../db/schema";
import { preffered_standing } from "../../../lib/const/preffered-standing";
import { Checkbox } from "../../../components/ui/checkbox";
import ImageInput from "../../../components/ui/image-input";
import Image from "next/image";

type FormData = z.infer<typeof newPlantSchema>;

export default function NewPlantPage() {
    const [pending, startTransition] = useTransition();
    const form = useForm<FormData>({
        resolver: zodResolver(newPlantSchema),
        defaultValues: { images: [], name: "", performance: 3, description: "", height: [30, 50], water_needs: 2, flowering_months: [4, 10], alt_names: [""], preffered_standing: [] }
    });

    const onSubmit = form.handleSubmit(async (formData: FormData) => {
        startTransition(() => {
            console.log("submit");
        });
    });

    return (
        <div className="py-8 px-2 max-w-screen-md mx-auto">
            <Form {...form}>
                <form onSubmit={onSubmit} className="flex flex-col gap-4">
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
                        name="alt_names"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Inne nazwy</FormLabel>
                                <FormControl>
                                    <Input value={field.value?.join(",") || ""} onChange={e => field.onChange(e.target.value.trim().split(","))} />
                                </FormControl>
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
                        name="hints"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Wskazówki</FormLabel>
                                <FormControl>
                                    <Textarea {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="images"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Zdjęcia</FormLabel>
                                <FormControl className="">
                                    <div className="grid grid-cols-3 gap-2">
                                        <ImageInput onFileAdd={file => form.setValue("images", [...field.value, file])} />
                                        {/* <ImageInput onFileAdd={file => form.setValue("images", [file, ...form.watch("images")])} /> */}
                                        {field.value.map((file, index) => (
                                            <div key={`${file.name}-${index}`} className="relative rounded-sm overflow-hidden bg-primary-foreground">
                                                <Image fill className="object-contain" alt="" src={URL.createObjectURL(file)} />
                                            </div>
                                        ))}
                                    </div>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="performance"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Siła wzrostu
                                    <span className="ml-4">{field.value}/5</span>
                                </FormLabel>
                                <FormControl>
                                    <Slider defaultValue={[field.value]} min={1} max={5} step={1} onValueChange={v => field.onChange(v[0])} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="water_needs"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Wymagane podlewanie
                                    <span className="ml-4 font-normal">{field.value}/5</span>
                                </FormLabel>
                                <FormControl>
                                    <Slider defaultValue={[field.value]} min={1} max={5} step={1} onValueChange={v => field.onChange(v[0])} />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="height"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Wysokość{" "}
                                    <span className="ml-4 font-normal">
                                        {field.value[0]}cm-{field.value[1]}cm
                                    </span>{" "}
                                </FormLabel>
                                <FormControl>
                                    <Slider minStepsBetweenThumbs={5} defaultValue={[30, 40]} min={10} max={200} step={1} onValueChange={field.onChange} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="flowering_months"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Okres kwitnienia{" "}
                                    <span className="ml-4 font-normal">
                                        {polish_month_names[field.value[0]]}-{polish_month_names[field.value[1]]}
                                    </span>{" "}
                                </FormLabel>
                                <FormControl>
                                    <Slider minStepsBetweenThumbs={1} defaultValue={[4, 10]} min={1} max={12} step={1} onValueChange={field.onChange} />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="preffered_standing"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Preferowane stanowiska</FormLabel>
                                {preffered_standing.map(value => (
                                    <FormField
                                        control={form.control}
                                        key={value}
                                        name="preffered_standing"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-start space-x-2 space-y-0">
                                                <FormControl>
                                                    <Checkbox
                                                        className="self-center"
                                                        checked={field.value.includes(value)}
                                                        onCheckedChange={checked => {
                                                            checked ? field.onChange([...field.value, value]) : field.onChange(field.value.filter(v => v !== value));
                                                        }}
                                                    />
                                                </FormControl>
                                                <FormLabel className="text-sm font-normal">{value}</FormLabel>
                                            </FormItem>
                                        )}
                                    />
                                ))}
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className="mt-8" disabled={pending}>
                        Dodaj rośline
                    </Button>
                </form>
            </Form>
            {/* <form onSubmit={onSubmit} className="flex flex-col gap-2">
                <div className="flex flex-col gap-1">
                    <Label htmlFor="name">Nazwa</Label>
                    <Input type="text" id="name" {...register("name")} />
                </div>
                <div>
                    <Label htmlFor="description">Opis</Label>
                    <Textarea id="description" {...register("description")} />
                </div>
                <div>
                    <Label htmlFor="alt_names">Inne nazwy</Label>
                    <Input
                        id="alt_names"
                        value={watch("alt_names")}
                        onChange={e => {
                            const strings = e.target.value.split(",");
                            setValue("alt_names", strings);
                        }}
                    />
                </div>
                <Button onClick={onSubmit} type="submit">
                    Dodaj
                </Button>
            </form> */}
        </div>
    );
}
