import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import styles from '../styles/ImageCarousel.module.css';

const images = [
  {
    src: '/images/carousel1.jpg',
    alt: 'THL Carousel Image 1',
  },
  {
    src: '/images/carousel2.jpg',
    alt: 'THL Carousel Image 2',
  },
  {
    src: '/images/carousel3.jpg',
    alt: 'THL Carousel Image 3',
  },
];

const variants = {
  enter: (direction) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0
  })
};

export default function ImageCarousel() {
  const [[currentIndex, direction], setPage] = useState([0, 0]);

  const paginate = (newDirection) => {
    const nextIndex = currentIndex + newDirection;
    if (nextIndex < 0) {
      setPage([images.length - 1, newDirection]);
    } else if (nextIndex >= images.length) {
      setPage([0, newDirection]);
    } else {
      setPage([nextIndex, newDirection]);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(timer);
  }, [currentIndex]);

  return (
    <div className={styles.carousel}>
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }}
          className={styles.imageContainer}
        >
          <Image
            src={images[currentIndex].src}
            alt={images[currentIndex].alt}
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
        </motion.div>
      </AnimatePresence>
      
      <button 
        className={`${styles.navButton} ${styles.prevButton}`}
        onClick={() => paginate(-1)}
      >
        ‹
      </button>
      <button 
        className={`${styles.navButton} ${styles.nextButton}`}
        onClick={() => paginate(1)}
      >
        ›
      </button>

      <div className={styles.dots}>
        {images.map((_, index) => (
          <button
            key={index}
            className={`${styles.dot} ${index === currentIndex ? styles.activeDot : ''}`}
            onClick={() => setPage([index, index > currentIndex ? 1 : -1])}
          />
        ))}
      </div>
    </div>
  );
} 