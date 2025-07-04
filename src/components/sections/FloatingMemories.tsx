"use client"

import { useEffect } from "react"
import { motion, stagger, useAnimate } from "motion/react"
import Image from 'next/image'

import Floating, { FloatingElement } from "@/components/ui/parallax-floating"
import { galleryPhotos } from "@/lib/data"

const FloatingMemories = () => {
  const [scope, animate] = useAnimate()

  useEffect(() => {
    animate("img", { opacity: [0, 1] }, { duration: 0.5, delay: stagger(0.15) })
  }, [animate])

  // Usar as fotos reais do relacionamento
  const ourPhotos = galleryPhotos.slice(0, 8)

  return (
    <div
      className="w-full min-h-screen overflow-hidden relative pt-20 pb-44 px-4"
      ref={scope}
    >
      {/* Texto central */}
      <motion.div
        className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.88, delay: 1.5 }}
      >
        <div className="text-center space-y-4">
        <p 
          className="z-50 text-white italic"
          style={{
            fontFamily: '"Dancing Script", cursive',
            fontWeight: 400,
            fontSize: 'clamp(2.7rem, 10vw, 4.5rem)'
          }}
        >
          love.
        </p>
        </div>
      </motion.div>

      {/* Fotos flutuantes */}
      <Floating sensitivity={-1} className="overflow-visible">
        {/* Foto 1 - Selfie formatura - Canto superior esquerdo */}
        <FloatingElement depth={0.5} className="top-[15%] left-[4%] md:top-[12%] md:left-[5%]">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Image
              src="/images/love/1.jpg"
              alt="Nossa memória especial"
              width={160}
              height={160}
              className="w-[130px] h-[130px] md:w-[160px] md:h-[160px] object-cover hover:scale-105 duration-200 cursor-pointer transition-transform rounded-lg shadow-lg"
            />
          </motion.div>
        </FloatingElement>

        {/* Foto 2 - Momento ao ar livre dos dois - Topo centro-esquerda */}
        <FloatingElement depth={1} className="top-[30%] left-[50%] md:top-[20%] md:left-[22%]">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Image
              src="/images/love/2.jpg"
              alt="Nossa memória especial"
              width={176}
              height={176}
              className="w-[150px] h-[120px] md:w-[176px] md:h-[176px] object-cover hover:scale-105 duration-200 cursor-pointer transition-transform rounded-lg shadow-lg"
            />
          </motion.div>
        </FloatingElement>

        {/* Foto 3 - Casal abraçado sorrindo - Topo centro-direita (maior) */}
        <FloatingElement depth={2} className="top-[10%] left-[45%] md:top-[5%] md:left-[48%]">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Image
              src="/images/love/3.jpg"
              alt="Nossa memória especial"
              width={240}
              height={320}
              className="w-28 h-36 md:w-60 md:h-80 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform rounded-lg shadow-lg"
            />
          </motion.div>
        </FloatingElement>

        {/* Foto 4 - Os dois em momento especial - Topo direita */}
        <FloatingElement depth={1} className="top-[10%] left-[75%] md:top-[6%] md:left-[75%]">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <Image
              src="/images/love/4.jpg"
              alt="Nossa memória especial"
              width={192}
              height={300}
              className="w-[120px] h-[150px] md:w-[192px] md:h-[300px] object-cover hover:scale-105 duration-200 cursor-pointer transition-transform rounded-lg shadow-lg"
            />
          </motion.div>
        </FloatingElement>
 
        {/* Foto 5 - Os dois relaxando juntos - Meio esquerda */}
        <FloatingElement depth={1} className="top-[35%] left-[10%] md:top-[38%] md:left-[6%]">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0 }}
          >
            <Image
              src="/images/love/5.jpg"
              alt="Nossa memória especial"
              width={208}
              height={208}
              className="w-[120px] h-[140px] md:w-[208px] md:h-[208px] object-cover hover:scale-105 duration-200 cursor-pointer transition-transform rounded-lg shadow-lg"
            />
          </motion.div>
        </FloatingElement>

        {/* Foto 6 - Os dois arrumados em evento especial - Base direita */}
        <FloatingElement depth={2} className="top-[53%] left-[75%] md:top-[52%] md:left-[72%]">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <Image
              src="/images/love/6.jpg"
              alt="Nossa memória especial"
              width={240}
              height={320}
              className="w-[120px] h-[132px] md:w-[240px] md:h-[320px] object-cover hover:scale-105 duration-200 cursor-pointer transition-transform rounded-lg shadow-lg"
            />
          </motion.div>
        </FloatingElement>

        {/* Foto 7 - Os dois com os cachorros - Base esquerda */}
        <FloatingElement depth={4} className="top-[65%] left-[13%] md:top-[60%] md:left-[25%]">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
          >
            <Image
              src="/images/love/7.jpg"
              alt="Nossa memória especial"
              width={220}
              height={220}
              className="w-[150px] h-[120px] md:w-[220px] md:h-[220px] object-cover hover:scale-105 duration-200 cursor-pointer transition-transform rounded-lg shadow-lg"
            />
          </motion.div>
        </FloatingElement>

        {/* Foto 8 - Selfie dos dois de camisa preta - Base centro */}
        <FloatingElement depth={1} className="top-[68%] left-[50%] md:top-[65%] md:left-[45%]">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6 }}
          >
            <Image
              src="/images/love/8.jpg"
              alt="Nossa memória especial"
              width={250}
              height={200}
              className="w-[120px] h-[120px] md:w-[250px] md:h-[200px] object-cover hover:scale-105 duration-200 cursor-pointer transition-transform rounded-lg shadow-lg"
            />
          </motion.div>
        </FloatingElement>
      </Floating>
    </div>
  )
}

export default FloatingMemories 