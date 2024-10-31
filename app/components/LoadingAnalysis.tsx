"use client";

import { motion } from "framer-motion";
import { LoadingAnalysisProps } from "../types";

export const LoadingAnalysis: React.FC<LoadingAnalysisProps> = ({
  theme,
  Icon,
}) => {
  return (
    <div className="fixed inset-0 -top-10 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="bg-white rounded-2xl p-8 flex flex-col items-center gap-4 max-w-sm mx-4"
      >
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Icon className="w-12 h-12" style={{ color: theme.primary }} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center"
        >
          <h3 className="text-xl font-semibold mb-2">Analyzing Image</h3>
          <p className="text-gray-600">Our AI is studying every detail...</p>
        </motion.div>
        <motion.div
          className="w-full h-2 bg-gray-200 rounded-full overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <motion.div
            className="h-full"
            style={{ backgroundColor: theme.primary }}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};
