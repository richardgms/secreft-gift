"use client"

import { motion } from "motion/react"
import { cn } from "@/lib/utils"

interface SectionIndicatorProps {
  totalSections: number
  currentSection: number
  className?: string
}

const SectionIndicator: React.FC<SectionIndicatorProps> = ({
  totalSections,
  currentSection,
  className
}) => {
  return (
    <div className={cn(
      "fixed right-6 top-1/2 transform -translate-y-1/2 z-40",
      "hidden lg:flex flex-col gap-3",
      className
    )}>
      {Array.from({ length: totalSections }).map((_, index) => (
        <motion.div
          key={index}
          className={cn(
            "w-2 h-8 rounded-full transition-all duration-300 border border-white/20",
            index === currentSection 
              ? "bg-gradient-to-b from-pink-400 to-purple-400 shadow-lg" 
              : "bg-white/10 hover:bg-white/20"
          )}
          initial={{ scale: 0.8, opacity: 0.5 }}
          animate={{ 
            scale: index === currentSection ? 1.2 : 0.8,
            opacity: index === currentSection ? 1 : 0.5,
          }}
          transition={{ duration: 0.3 }}
        />
      ))}
      
      {/* Current section number */}
      <motion.div
        className="mt-2 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <span className="text-white/60 text-xs font-medium">
          {currentSection + 1}/{totalSections}
        </span>
      </motion.div>
    </div>
  )
}

export default SectionIndicator 