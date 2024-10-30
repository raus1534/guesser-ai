"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { categories } from "../config/categories";
import { NavigationProps } from "../types";
import Link from "next/link";
import { Lightbulb } from "lucide-react";
import { useCategory } from "../contexts/CategoryContext";

export const Navigation: React.FC<NavigationProps> = ({ onCategoryChange }) => {
  const { activeCategory } = useCategory();
  const [color, setColor] = useState(activeCategory?.theme?.primary);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setColor(activeCategory?.theme?.primary);
  }, [activeCategory]);
  return (
    <>
      <nav className="w-full bg-white  fixed top-0 left-0 z-50 rounded-xl shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo Section */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center">
                <Lightbulb size={32} className={`text-[${color}]`} />
                <span className={`ml-2 text-xl font-bold text-[${color}]`}>
                  Guesser
                </span>
              </Link>
            </div>

            {/* Desktop Categories */}
            <div className="hidden md:flex flex-1 ml-8 max-w-[70%]">
              <motion.div
                className="flex overflow-x-auto gap-2 scrollbar-hide"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="flex gap-2 px-2">
                  {categories.map((category) => {
                    const Icon = category.icon;
                    const isActive = category.id === activeCategory.id;

                    return (
                      <motion.button
                        key={category.id}
                        onClick={() => onCategoryChange(category)}
                        className={`
                          flex items-center gap-2 px-3 py-1.5 rounded-lg font-medium
                          transition-colors relative whitespace-nowrap text-sm
                          ${
                            isActive
                              ? "text-white"
                              : "text-gray-600 hover:text-gray-900"
                          }
                        `}
                        style={{
                          backgroundColor: isActive
                            ? category.theme.primary
                            : "transparent",
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Icon className="w-4 h-4" />
                        {category.name}
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                aria-label="Toggle menu"
              >
                {!isMenuOpen ? (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            className="md:hidden absolute top-16 left-0 w-full bg-white shadow-lg"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="px-4 py-2 space-y-2">
              {categories.map((category) => {
                const Icon = category.icon;
                const isActive = category.id === activeCategory.id;

                return (
                  <motion.button
                    key={category.id}
                    onClick={() => {
                      onCategoryChange(category);
                      setIsMenuOpen(false);
                    }}
                    className={`
                      flex items-center gap-2 px-3 py-2 rounded-lg font-medium
                      transition-colors relative whitespace-nowrap text-sm w-full
                      ${
                        isActive
                          ? "text-white"
                          : "text-gray-600 hover:text-gray-900"
                      }
                    `}
                    style={{
                      backgroundColor: isActive
                        ? category.theme.primary
                        : "transparent",
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="w-4 h-4" />
                    {category.name}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </nav>
      {/* Spacer to prevent content from hiding behind fixed navbar */}
      <div className="h-16"></div>
    </>
  );
};
