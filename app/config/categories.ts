import { Category } from "../types";
import { Flower, Car, Building, Dog, Bean } from "lucide-react";

export const categories: Category[] = [
  {
    id: "plants",
    name: "Plants",
    icon: Flower,
    prompt:
      "Analyze this plant image and provide: 1. Plant name (common and scientific) 2. Brief description 3. Care instructions 4. Interesting facts",
    theme: {
      primary: "#22c55e",
      secondary: "#dcfce7",
      gradient: {
        from: "#f0fdf4",
        to: "#ffffff",
      },
    },
  },
  {
    id: "cars",
    name: "Cars",
    icon: Car,
    prompt:
      "Analyze this car image and provide: 1. Make and model 2. Year range 3. Key features 4. Performance specifications 5. Interesting facts",
    theme: {
      primary: "#3b82f6",
      secondary: "#dbeafe",
      gradient: {
        from: "#eff6ff",
        to: "#ffffff",
      },
    },
  },
  {
    id: "architecture",
    name: "Buildings",
    icon: Building,
    prompt:
      "Analyze this building/architecture and provide: 1. Style/type 2. Estimated period 3. Architectural features 4. Historical significance",
    theme: {
      primary: "#8b5cf6",
      secondary: "#ede9fe",
      gradient: {
        from: "#f5f3ff",
        to: "#ffffff",
      },
    },
  },
  {
    id: "pets",
    name: "Pets",
    icon: Dog,
    prompt:
      "Analyze this pet/animal and provide: 1. Breed/species 2. Characteristics 3. Temperament 4. Care requirements 5. Interesting facts",
    theme: {
      primary: "#ec4899",
      secondary: "#fce7f3",
      gradient: {
        from: "#fdf2f8",
        to: "#ffffff",
      },
    },
  },
  {
    id: "food",
    name: "Food",
    icon: Bean,
    prompt:
      "Analyze this food item and provide: 1. Dish name 2. Cuisine type 3. Main ingredients 4. Nutritional highlights 5. Cultural significance",
    theme: {
      primary: "#f59e0b",
      secondary: "#fef3c7",
      gradient: {
        from: "#fffbeb",
        to: "#ffffff",
      },
    },
  },
];
