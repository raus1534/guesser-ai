import { LucideIcon } from "lucide-react";

export type Category = {
  id: string;
  name: string;
  icon: LucideIcon;
  prompt: string;
  theme: {
    primary: string;
    secondary: string;
    gradient: {
      from: string;
      to: string;
    };
  };
};

export type AnalysisResult = {
  result: string;
  error?: string;
};
