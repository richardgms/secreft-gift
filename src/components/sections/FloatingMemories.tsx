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
      className="w-full min-h-screen overflow-hidden relative"
      ref={scope}
      style={{
        paddingTop: '120px',
        paddingBottom: '300px',
        paddingLeft: '60px',
        paddingRight: '60px'
      }}
    >
      {/* Texto central */}
      <motion.div
        className="absolute inset-0 z-50 flex items-center justify-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.88, delay: 1.5 }}
      >
        <div className="text-center space-y-4">
        <p 
          className="text-5xl md:text-7xl z-50 text-white italic"
          style={{
            fontFamily: '"Dancing Script", cursive',
            fontWeight: 400
          }}
                  >
            love.
          </p>
        </div>
      </motion.div>

      {/* Fotos flutuantes */}
      <Floating sensitivity={-1} className="overflow-hidden">
        
        {/* Foto 1 - Canto superior esquerdo */}
        <FloatingElement depth={0.5} className="top-[15%] left-[8%]">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Image
              src="/images/love/Screenshot_20250621_132728_Instagram.jpg"
              alt="Nossa memória especial"
              width={120}
              height={120}
              className="w-20 h-20 md:w-28 md:h-28 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform rounded-lg"
            />
          </motion.div>
        </FloatingElement>
        
        {/* Foto 2 - Topo centro-esquerda */}
        <FloatingElement depth={1} className="top-[18%] left-[25%]">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Image
              src="/images/love/Screenshot_20250621_132745_Instagram.jpg"
              alt="Nossa memória especial"
              width={140}
              height={140}
              className="w-24 h-24 md:w-32 md:h-32 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform rounded-lg"
            />
          </motion.div>
        </FloatingElement>
        
        {/* Foto 3 - Topo centro-direita (maior) */}
        <FloatingElement depth={2} className="top-[8%] left-[53%]">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Image
              src="/images/love/Screenshot_20250621_132823_Instagram.jpg"
              alt="Nossa memória especial"
              width={200}
              height={280}
              className="w-32 h-48 md:w-48 md:h-60 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform rounded-lg"
            />
          </motion.div>
        </FloatingElement>
        
        {/* Foto 4 - Topo direita */}
        <FloatingElement depth={1} className="top-[8%] left-[78%]">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <Image
              src="/images/love/20250305_120200 (1).jpg"
              alt="Nossa memória especial"
              width={160}
              height={160}
              className="w-28 h-28 md:w-36 md:h-36 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform rounded-lg"
            />
          </motion.div>
        </FloatingElement>

        {/* Foto 5 - Meio esquerda */}
        <FloatingElement depth={1} className="top-[40%] left-[5%]">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0 }}
          >
            <Image
              src="/images/love/20250322_200319 (1).jpg"
              alt="Nossa memória especial"
              width={180}
              height={180}
              className="w-32 h-32 md:w-40 md:h-40 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform rounded-lg"
            />
          </motion.div>
        </FloatingElement>
        
        {/* Foto 6 - Base direita */}
        <FloatingElement depth={2} className="top-[55%] left-[77%]">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <Image
              src="/images/love/20250503_183419.jpg"
              alt="Nossa memória especial"
              width={200}
              height={240}
              className="w-32 h-32 md:w-40 md:h-56 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform rounded-lg"
            />
          </motion.div>
        </FloatingElement>

        {/* Foto 7 - Base esquerda */}
        <FloatingElement depth={4} className="top-[58%] left-[15%]">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
          >
            <Image
              src="/images/love/20250308_052204.jpg"
              alt="Nossa memória especial"
              width={260}
              height={300}
              className="w-48 md:w-60 h-48 md:h-60 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform rounded-lg"
              style={{ width: "auto", height: "auto" }}
            />
          </motion.div>
        </FloatingElement>
        
        {/* Foto 8 - Base centro */}
        <FloatingElement depth={1} className="top-[62%] left-[50%]">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6 }}
          >
            <Image
              src="/images/love/IMG_20250203_172505_051.webp"
              alt="Nossa memória especial"
              width={160}
              height={160}
              className="w-28 h-28 md:w-36 md:h-36 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform rounded-lg"
            />
          </motion.div>
        </FloatingElement>
        
      </Floating>
    </div>
  )
}

export default FloatingMemories 