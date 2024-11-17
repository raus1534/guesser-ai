import { Category } from "../types";
import { Flower, Car, Building, Dog, Bean } from "lucide-react";

export const categories: Category[] = [
  {
    id: "plants",
    name: "Plants",
    icon: Flower,
    prompt:
      "Analyze this plant image and return the information as an object. The object should include the following keys and values:\n" +
      "{\n" +
      '  "Name": "Snake Plant",\n' +
      '  "Scientific Name": "Sansevieria trifasciata",\n' +
      '  "Description": "Bla bla",\n' +
      '  "Care Instructions": "Water once every 2-3 weeks",\n' +
      '  "Interesting Fact": "Known for air-purifying qualities"\n' +
      "}\n" +
      'If the image does not depict a plant, return an object stating: {"Name":"[Name of Object]","Fault": "This image falls under the wrong category as it depicts a [give name and description of the image]."}',
    theme: {
      primary: "#4caf50", // Green for growth and nature
      secondary: "#e8f5e9", // Light green for calmness
      gradient: {
        from: "#f1f8e9", // Soft green for tranquility
        to: "#ffffff",
      },
    },
  },
  {
    id: "cars",
    name: "Cars",
    icon: Car,
    prompt:
      "Analyze this car image and return the information as an object. The object should include the following keys and values:\n" +
      "{\n" +
      '  "Name": "Tesla",\n' +
      '  "Model": "Model S",\n' +
      '  "Year": "2021",\n' +
      '  "Key Features": "Electric, Autopilot",\n' +
      '  "Performance Specs": "0-60 mph in 2.4 seconds",\n' +
      '  "Notable Facts": "First mass-produced electric luxury car"\n' +
      "}\n" +
      'If the image does not depict a car, return an object stating: {"Name":"[Name of Object]","Fault": "This image falls under the wrong category as it depicts a [give name and description of the image]."}',
    theme: {
      primary: "#1e3a8a", // Deep blue for trust and dependability
      secondary: "#e0e7ff", // Soft blue for stability
      gradient: {
        from: "#e3f2fd", // Light blue for modernity
        to: "#ffffff",
      },
    },
  },
  {
    id: "architecture",
    name: "Buildings",
    icon: Building,
    prompt:
      "Analyze this building/architecture image and return the information as an object. The object should include the following keys and values:\n" +
      "{\n" +
      '  "Name": "Twin Tower",\n' +
      '  "Interesting Facts": "12th Century",\n' +
      '  "Key Features": "Pointed arches, flying buttresses",\n' +
      '  "Historical Significance": "Represents a major architectural movement"\n' +
      "}\n" +
      'If the image does not depict a building, return an object stating: {"Name":"[Name of Object]","Fault": "This image falls under the wrong category as it depicts a [give name and description of the image]."}',
    theme: {
      primary: "#6b7280", // Gray for strength and stability
      secondary: "#f3f4f6", // Light gray for modernity
      gradient: {
        from: "#f7f9fc", // Soft neutral tones for sophistication
        to: "#ffffff",
      },
    },
  },
  {
    id: "pets",
    name: "Pets",
    icon: Dog,
    prompt:
      "Analyze this pet/animal image and return the information as an object. The object should include the following keys and values:\n" +
      "{\n" +
      '  "Name": "Labrador Retriever",\n' +
      '  "Key Characteristics": "Friendly, loyal",\n' +
      '  "Temperament Traits": "Gentle, energetic",\n' +
      '  "Care Requirements": "Daily exercise, regular grooming",\n' +
      '  "Fun Fact": "Great family pets"\n' +
      "}\n" +
      'If the image does not depict a pet, return an object stating: {"Name":"[Name of Object]","Fault": "This image falls under the wrong category as it depicts a [give name and description of the image]."}',
    theme: {
      primary: "#ff6347", // Warm red-orange for playfulness and affection
      secondary: "#ffe4e1", // Soft pink for comfort and warmth
      gradient: {
        from: "#fff5f7", // Light warm tone for gentleness
        to: "#ffffff",
      },
    },
  },
  {
    id: "food",
    name: "Food",
    icon: Bean,
    prompt:
      "Analyze this food item and return the information as an object. The object should include the following keys and values:\n" +
      "{\n" +
      '  "Name": "Pad Thai",\n' +
      '  "Cuisine Type": "Thai",\n' +
      '  "Main Ingredients": "Rice noodles, shrimp, tofu",\n' +
      '  "Nutritional Highlights": "High in protein",\n' +
      '  "Cultural Significance": "Popular street food in Thailand"\n' +
      "}\n" +
      'If the image does not depict food, return an object stating: {"Name":"[Name of Object]","Fault": "This image falls under the wrong category as it depicts a [give name and description of the image]."}',
    theme: {
      primary: "#ffa500", // Orange for appetite stimulation
      secondary: "#fff5e0", // Light orange for warmth
      gradient: {
        from: "#fffaf0", // Soft, creamy tone for deliciousness
        to: "#ffffff",
      },
    },
  },
];
