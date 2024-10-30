"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";
import {
  Info,
  Tag,
  ListTree,
  Link as LinkIcon,
  ExternalLink,
  Share2,
} from "lucide-react";
import { scrollToElement } from "@utils/scroll";
import {
  FooterSectionProps,
  InfoSectionProps,
  LinksSectionProps,
  ResultCardProps,
} from "../types";
import { useCategory } from "../contexts/CategoryContext";

// Generalized information extraction function
const extractInformation = (text: string) => {
  const startIndex = text.indexOf("{");
  const endIndex = text.lastIndexOf("}") + 1;

  if (startIndex !== -1 && endIndex !== -1) {
    const jsonString = text.slice(startIndex, endIndex);

    // Check if the jsonString is valid JSON
    try {
      const plantData = JSON.parse(jsonString);
      return plantData;
    } catch (error) {
      return null;
    }
  } else {
    return null;
  }
};

const InfoSection: React.FC<InfoSectionProps> = ({ title, value, theme }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.2 }}
    className="flex gap-4"
  >
    <div
      className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center"
      style={{ backgroundColor: theme.secondary }}
    >
      <Info className="w-5 h-5" style={{ color: theme.primary }} />
    </div>
    <div>
      <h4 className="font-semibold mb-2">{title}</h4>
      <p className="text-gray-600 leading-relaxed">{value}</p>
    </div>
  </motion.div>
);

const LinksSection: React.FC<LinksSectionProps> = ({ links, theme }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.5 }}
    className="flex gap-4"
  >
    <div
      className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center"
      style={{ backgroundColor: theme.secondary }}
    >
      <LinkIcon className="w-5 h-5" style={{ color: theme.primary }} />
    </div>
    <div className="flex-grow">
      <h4 className="font-semibold mb-2">Learn More</h4>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {links.map((link, index) => (
          <motion.a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 p-3 rounded-lg hover:opacity-80 transition-opacity"
            style={{ backgroundColor: theme.secondary }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <link.icon className="w-4 h-4" style={{ color: theme.primary }} />
            <span className="text-sm font-medium">{link.name}</span>
            <ExternalLink
              className="w-3 h-3 ml-auto"
              style={{ color: theme.primary }}
            />
          </motion.a>
        ))}
      </div>
    </div>
  </motion.div>
);

const FooterSection: React.FC<FooterSectionProps> = ({ parsedResult }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.6 }}
    className="border-t border-gray-100 p-4 flex items-center justify-between"
  >
    <p className="text-sm text-gray-500">
      Want to learn more? Click the links above!
    </p>
    <button
      className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
      onClick={() => {
        navigator
          .share({
            title: parsedResult.Name || "",
            text: parsedResult.description || "",
            url: window.location.href,
          })
          .catch(() => {});
      }}
    >
      <Share2 className="w-5 h-5 text-gray-500" />
    </button>
  </motion.div>
);

export const ResultCard: React.FC<ResultCardProps> = ({ result }) => {
  const { activeCategory } = useCategory();
  useEffect(() => {
    scrollToElement("resultSection");
  }, [result]);

  const parsedResult = extractInformation(result);

  // Generate relevant links based on the name
  const generateLinks = () => {
    const searchTerm = encodeURIComponent(parsedResult?.Name || "");
    return [
      {
        name: "Wikipedia",
        url: `https://wikipedia.org/wiki/${searchTerm}`,
        icon: Info,
      },
      {
        name: "Images",
        url: `https://images.google.com/search?q=${searchTerm}`,
        icon: Tag,
      },
      {
        name: `More ${activeCategory?.name} Info`,
        url: `https://www.google.com/search?q=${searchTerm}+${activeCategory?.name}+information`,
        icon: ListTree,
      },
    ];
  };

  return (
    <div id="resultSection">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-xl overflow-hidden"
      >
        {/* Header */}
        <div
          className="p-6"
          style={{ backgroundColor: activeCategory?.theme.secondary }}
        >
          <motion.h3
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-2xl font-bold"
            style={{ color: activeCategory?.theme.primary }}
          >
            {parsedResult?.Name || ""}
          </motion.h3>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {parsedResult &&
            Object.entries(parsedResult).map(([key, value]) => {
              if (!value) return null; // Skip empty values
              if (key == "Name" || key == "name") return;
              return (
                <InfoSection
                  title={key}
                  value={value.toString()}
                  key={key}
                  theme={activeCategory?.theme}
                />
              );
            })}

          {/* External Links */}
          <LinksSection links={generateLinks()} theme={activeCategory?.theme} />
        </div>

        {/* Footer */}
        <FooterSection parsedResult={parsedResult} />
      </motion.div>
    </div>
  );
};
