"use client";

import React from "react";
import { motion } from "framer-motion";

interface CommandOutputProps {
  command: string;
  output: React.ReactNode;
  index: number;
}

export default function CommandOutput({
  command,
  output,
  index,
}: CommandOutputProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="space-y-2"
    >
      {/* Command prompt line */}
      <div className="flex items-center gap-2">
        <span className="text-gold text-glow-gold shrink-0">❯</span>
        <span className="text-slate-light">{command}</span>
      </div>

      {/* Output */}
      {output && <div className="pl-0 sm:pl-4 pb-2">{output}</div>}
    </motion.div>
  );
}
