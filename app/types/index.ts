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

export interface ResultCardProps {
  result: string;
}

// Type for extracted information
export interface ExtractedInfo {
  [key: string]: string;
}

export interface InfoSectionProps {
  title: string;
  value: string;
  theme: {
    primary: string;
    secondary: string;
  };
}

// Helper component for displaying links
export interface LinksSectionProps {
  links: { name: string; url: string; icon: React.ElementType }[];
  theme: {
    primary: string;
    secondary: string;
  };
}

// Helper component for the footer
export interface FooterSectionProps {
  parsedResult: ExtractedInfo;
}

export interface NavigationProps {
  onCategoryChange: (category: Category) => void;
}

export interface LoadingAnalysisProps {
  Icon: LucideIcon;
  theme: {
    primary: string;
    secondary: string;
    gradient: {
      from: string;
      to: string;
    };
  };
}

export interface ImageCaptureProps {
  onImageCapture: (image: string | null) => void;
}
