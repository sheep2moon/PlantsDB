import { Cloudy } from "lucide-react";

type PlantFeature = {
    name: string;
    hint: string;
    icon: React.ReactNode;
};

export const plant_features: { [k: string]: PlantFeature } = {
    shadow: {
        name: "Cień",
        hint: "Roślina dobrze rośnie w cieniu.",
        icon: <Cloudy />
    }
} as const;
