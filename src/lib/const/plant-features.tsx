import { Cloudy } from "lucide-react";
import { plant_features_keys } from "./const";

type PlantFeature = {
    name: string;
    hint: string;
    icon: React.ReactNode;
};

export const plant_features: { [key in (typeof plant_features_keys)[number]]: PlantFeature } = {
    shadow: {
        name: "Cień",
        hint: "Roślina dobrze rośnie w cieniu.",
        icon: <Cloudy />
    },
    drought_resistant: {
        name: "Odporność na susze",
        hint: "Roślina bardzo dobrze znosi susze.",
        icon: <Cloudy />
    }
} as const;
