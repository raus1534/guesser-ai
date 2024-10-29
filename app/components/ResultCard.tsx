"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";
import {
  Info,
  Tag,
  ListTree,
  Heart,
  Link as LinkIcon,
  ExternalLink,
  Share2,
} from "lucide-react";
import { scrollToElement } from "@utils/scroll";

interface ResultCardProps {
  result: string;
  theme: {
    primary: string;
    secondary: string;
    gradient: {
      from: string;
      to: string;
    };
  };
  category: string;
}

export const ResultCard: React.FC<ResultCardProps> = ({
  result,
  theme,
  category,
}) => {
  useEffect(() => {
    scrollToElement("resultSection");
  }, [result]);

  // Parse the result into sections
  const parseResult = (text: string) => {
    const sections = text.split("\n\n");
    const parsed = {
      name: sections[0]?.split(":").pop()?.trim() || "",
      description: sections[1]?.split(":").pop()?.trim() || "",
      details: sections[2]?.split(":").pop()?.trim() || "",
      facts: sections[3]?.split(":").pop()?.trim() || "",
    };
    return parsed;
  };

  const parsedResult = parseResult(result);

  // Generate relevant links based on the name
  const generateLinks = () => {
    const searchTerm = encodeURIComponent(parsedResult.name);
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
        name: `More ${category} Info`,
        url: `https://www.google.com/search?q=${searchTerm}+${category}+information`,
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
        <div className="p-6" style={{ backgroundColor: theme.secondary }}>
          <motion.h3
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-2xl font-bold"
            style={{ color: theme.primary }}
          >
            {parsedResult.name}
          </motion.h3>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Description Section */}
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
              <h4 className="font-semibold mb-2">Description</h4>
              <p className="text-gray-600 leading-relaxed">
                {parsedResult.description}
              </p>
            </div>
          </motion.div>

          {/* Details Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex gap-4"
          >
            <div
              className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: theme.secondary }}
            >
              <ListTree className="w-5 h-5" style={{ color: theme.primary }} />
            </div>
            <div>
              <h4 className="font-semibold mb-2">Details</h4>
              <div className="text-gray-600 leading-relaxed">
                {parsedResult.details.split(". ").map((detail, index) => (
                  <div key={index} className="flex items-start gap-2 mb-2">
                    <span
                      className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                      style={{ backgroundColor: theme.primary }}
                    />
                    <span>{detail.trim()}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Interesting Facts */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="flex gap-4"
          >
            <div
              className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: theme.secondary }}
            >
              <Heart className="w-5 h-5" style={{ color: theme.primary }} />
            </div>
            <div>
              <h4 className="font-semibold mb-2">Interesting Facts</h4>
              <p className="text-gray-600 leading-relaxed">
                {parsedResult.facts}
              </p>
            </div>
          </motion.div>

          {/* External Links */}
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
                {generateLinks().map((link, index) => (
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
                    <link.icon
                      className="w-4 h-4"
                      style={{ color: theme.primary }}
                    />
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
        </div>

        {/* Footer */}
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
                  title: parsedResult.name,
                  text: parsedResult.description,
                  url: window.location.href,
                })
                .catch(() => {});
            }}
          >
            <Share2 className="w-5 h-5 text-gray-500" />
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};
