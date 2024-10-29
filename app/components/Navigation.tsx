"use client";

import { motion } from "framer-motion";
import { categories } from "../config/categories";
import { Category } from "../types";

interface NavigationProps {
  activeCategory: Category;
  onCategoryChange: (category: Category) => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeCategory,
  onCategoryChange,
}) => {
  return (
    <nav className="w-full max-w-3xl mx-auto mb-8">
      <motion.div
        className="flex overflow-x-auto gap-2 p-2 bg-white rounded-xl shadow-sm"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {categories.map((category) => {
          const Icon = category.icon;
          const isActive = category.id === activeCategory.id;

          return (
            <motion.button
              key={category.id}
              onClick={() => onCategoryChange(category)}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-lg font-medium
                transition-colors relative whitespace-nowrap
                ${isActive ? "text-white" : "text-gray-600 hover:text-gray-900"}
              `}
              style={{
                backgroundColor: isActive
                  ? category.theme.primary
                  : "transparent",
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon />
              {category.name}
            </motion.button>
          );
        })}
      </motion.div>
    </nav>
  );
};
