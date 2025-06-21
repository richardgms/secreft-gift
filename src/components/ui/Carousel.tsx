"use client";

import { IconArrowNarrowRight } from "@tabler/icons-react";
import { useState, useRef, useId, useEffect } from "react";
import { cn } from "@/lib/utils";
import { GradientButton } from "./gradient-button";

interface SlideData {
  title: string;
  button: string;
  src: string;
  description?: string;
}

interface SlideProps {
  slide: SlideData;
  index: number;
  current: number;
  handleSlideClick: (index: number) => void;
  onButtonClick?: (index: number) => void;
}

const Slide = ({ slide, index, current, handleSlideClick, onButtonClick }: SlideProps) => {
  const slideRef = useRef<HTMLLIElement>(null);

  const xRef = useRef(0);
  const yRef = useRef(0);
  const frameRef = useRef<number>();

  useEffect(() => {
    const animate = () => {
      if (!slideRef.current) return;

      const x = xRef.current;
      const y = yRef.current;

      slideRef.current.style.setProperty("--x", `${x}px`);
      slideRef.current.style.setProperty("--y", `${y}px`);

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  const handleMouseMove = (event: React.MouseEvent) => {
    const el = slideRef.current;
    if (!el) return;

    const r = el.getBoundingClientRect();
    xRef.current = event.clientX - (r.left + Math.floor(r.width / 2));
    yRef.current = event.clientY - (r.top + Math.floor(r.height / 2));
  };

  const handleMouseLeave = () => {
    xRef.current = 0;
    yRef.current = 0;
  };

  const imageLoaded = (event: React.SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.style.opacity = "1";
  };

  const { src, button, title, description } = slide;

  return (
    <div className="[perspective:1200px] [transform-style:preserve-3d]">
      <li
        ref={slideRef}
        className="flex flex-1 flex-col items-center justify-center relative text-center text-white opacity-100 transition-all duration-300 ease-in-out w-[70vmin] h-[70vmin] mx-[4vmin] z-10 cursor-pointer"
        onClick={() => handleSlideClick(index)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform:
            current !== index
              ? "scale(0.95) rotateX(12deg)"
              : "scale(1) rotateX(0deg)",
          transition: "all 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          transformOrigin: "bottom",
          opacity: current !== index ? 0.6 : 1,
        }}
      >
        <div
          className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/80 to-secondary/80 rounded-[1%] overflow-hidden transition-all duration-150 ease-out shadow-glass"
          style={{
            transform:
              current === index
                ? "translate3d(calc(var(--x) / 30), calc(var(--y) / 30), 0)"
                : "none",
          }}
        >
          <img
            className="absolute inset-0 w-[120%] h-[120%] object-cover transition-all duration-700 ease-out"
            style={{
              opacity: current === index ? 1 : 0.5,
              transform: current === index ? 'scale(1)' : 'scale(1.05)',
            }}
            alt={title}
            src={src}
            onLoad={imageLoaded}
            loading="eager"
            decoding="sync"
          />
          <div 
            className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent transition-opacity duration-700 ease-out"
            style={{
              opacity: current === index ? 1 : 0,
            }}
          />
        </div>

        <article
          className={cn(
            "relative p-[4vmin] transition-all duration-700 ease-out",
            current === index ? "opacity-100 visible translate-y-0" : "opacity-0 invisible translate-y-4"
          )}
        >
          <h2 className="font-romantic text-lg md:text-2xl lg:text-4xl font-semibold relative mb-2 text-white">
            {title}
          </h2>
          {description && (
            <p className="text-white/80 text-sm md:text-base mb-4 font-light">
              {description}
            </p>
          )}
          <div className="flex justify-center">
            <GradientButton
              variant="variant"
              onClick={(e) => {
                e.stopPropagation();
                onButtonClick?.(index);
              }}
              className="mt-4"
            >
              {button}
            </GradientButton>
          </div>
        </article>
      </li>
    </div>
  );
};

interface CarouselControlProps {
  type: string;
  title: string;
  handleClick: () => void;
}

const CarouselControl = ({
  type,
  title,
  handleClick,
}: CarouselControlProps) => {
  return (
    <button
      className={cn(
        "w-12 h-12 flex items-center mx-3 justify-center bg-white/10 backdrop-blur-md border border-white/20 rounded-full focus:border-accent focus:outline-none hover:-translate-y-1 hover:shadow-neon active:translate-y-0 transition-all duration-200 text-white hover:text-accent",
        type === "previous" ? "rotate-180" : ""
      )}
      title={title}
      onClick={handleClick}
    >
      <IconArrowNarrowRight className="w-5 h-5" />
    </button>
  );
};

interface CarouselProps {
  slides: SlideData[];
  className?: string;
  onSlideClick?: (slideIndex: number) => void;
}

export default function Carousel({ slides, className, onSlideClick }: CarouselProps) {
  const [current, setCurrent] = useState(slides.length >= 3 ? 2 : 0); // Começa na terceira foto se disponível

  const handlePreviousClick = () => {
    const previous = current - 1;
    setCurrent(previous < 0 ? slides.length - 1 : previous);
  };

  const handleNextClick = () => {
    const next = current + 1;
    setCurrent(next === slides.length ? 0 : next);
  };

  const handleSlideClick = (index: number) => {
    if (current !== index) {
      setCurrent(index);
    }
  };

  const id = useId();

  return (
    <div
      className={cn("relative w-[70vmin] h-[70vmin] mx-auto", className)}
      aria-labelledby={`carousel-heading-${id}`}
    >
      <ul
        className="absolute flex mx-[-4vmin] transition-transform duration-700 ease-out"
        style={{
          transform: `translateX(-${current * (100 / slides.length)}%)`,
          width: `${slides.length * 100}%`,
        }}
      >
        {slides.map((slide, index) => (
          <Slide
            key={index}
            slide={slide}
            index={index}
            current={current}
            handleSlideClick={handleSlideClick}
            onButtonClick={onSlideClick}
          />
        ))}
      </ul>

      <div className="absolute flex justify-center w-full top-[calc(100%+2rem)]">
        <CarouselControl
          type="previous"
          title="Foto anterior"
          handleClick={handlePreviousClick}
        />

        <CarouselControl
          type="next"
          title="Próxima foto"
          handleClick={handleNextClick}
        />
      </div>


    </div>
  );
} 