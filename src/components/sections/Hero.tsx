"use client"

import { motion } from "motion/react"
import { ChevronDownIcon } from "@heroicons/react/24/outline"

const Hero = () => {

  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Background decorativo */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-slate-900/40 to-slate-900"></div>
      
      {/* Conteúdo principal */}
      <div className="relative z-10 text-center space-y-8 px-4">
        {/* Título principal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="space-y-4"
        >
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold">
            <span className="bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              Museu
            </span>
          </h1>
          <h2 
            className="text-4xl md:text-6xl lg:text-7xl text-white italic"
            style={{
              fontFamily: '"Dancing Script", cursive',
              fontWeight: 400
            }}
          >
            Flutuante
          </h2>
        </motion.div>

        {/* Subtítulo */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed"
        >
          Um espaço dedicado às nossas memórias mais preciosas
        </motion.p>

        {/* Indicador de scroll */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="pt-8"
        >
          <div className="flex flex-col items-center space-y-2 mx-auto">
            <span className="text-white/80 text-lg font-medium">
              Role para explorar
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="p-3 rounded-full border-2 border-white/30"
            >
              <ChevronDownIcon className="w-6 h-6 text-white/80" />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Partículas flutuantes decorativas */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/10 rounded-full"
            initial={{ 
              x: i * 200 + 100,
              y: i * 120 + 80,
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, 40 - 20, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default Hero 