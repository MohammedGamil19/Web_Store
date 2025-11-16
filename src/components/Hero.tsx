import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroImage1 from "@/assets/hero-image-men.jpg";
import heroImage2 from "@/assets/hero-image-women.jpg";
import heroImage3 from "@/assets/hero-image-accessories.jpg";

const Hero = () => {
  const images = [heroImage1, heroImage2, heroImage3];
  const extendedImages = [images[images.length - 1], ...images, images[0]];

  const [currentIndex, setCurrentIndex] = useState(1);
  const [isTransitionEnabled, setIsTransitionEnabled] = useState(true);
  // --- FIX: Add state to prevent clicks during animation ---
  const [canSlide, setCanSlide] = useState(true); 

  const touchStartX = useRef<number | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startAutoSlide = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      // Use a function callback to get the latest `canSlide` state
      setCanSlide(prevCanSlide => {
        if (prevCanSlide) {
          nextImage();
        }
        return prevCanSlide;
      });
    }, 4000);
  };

  useEffect(() => {
    startAutoSlide();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []); // Empty dependency array is correct here

  const handleSlide = (direction: 'next' | 'prev') => {
    // --- FIX: Check if sliding is allowed ---
    if (!canSlide) return;
    setCanSlide(false); // Lock the slider
    
    if (direction === 'next') {
        setCurrentIndex(prev => prev + 1);
    } else {
        setCurrentIndex(prev => prev - 1);
    }
  };

  const nextImage = () => handleSlide('next');
  const prevImage = () => handleSlide('prev');

  const handleTransitionEnd = () => {
    // --- FIX: Unlock the slider after animation completes ---
    setCanSlide(true); 

    if (currentIndex === extendedImages.length - 1) {
      setIsTransitionEnabled(false);
      setCurrentIndex(1);
    }
    if (currentIndex === 0) {
      setIsTransitionEnabled(false);
      setCurrentIndex(extendedImages.length - 2);
    }
  };
  
  useEffect(() => {
    if (!isTransitionEnabled) {
        const timer = setTimeout(() => setIsTransitionEnabled(true), 50);
        return () => clearTimeout(timer);
    }
  }, [isTransitionEnabled]);


  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) nextImage();
    else if (diff < -50) prevImage();
    touchStartX.current = null;
    startAutoSlide();
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, currentTarget } = e;
    const width = currentTarget.clientWidth;
    if (clientX < width / 2) prevImage();
    else nextImage();
    startAutoSlide();
  };

  return (
    <section
      className="relative -mt-20 min-h-[600px] md:min-h-[800px] flex items-center justify-center overflow-hidden select-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onClick={handleClick}
    >
      <div
        className="absolute inset-0 flex"
        onTransitionEnd={handleTransitionEnd}
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
          transition: isTransitionEnabled ? 'transform 1000ms ease-in-out' : 'none',
        }}
      >
        {extendedImages.map((img, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${img})`, backgroundPositionY: "0px" }}
          />
        ))}
      </div>

      {/* Overlay and Text Content */}
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 container mx-auto px-4 text-left">
        <div className="max-w-lg">
          <h2 className="text-4xl md:text-6xl font-heading font-light text-stone-300 mb-20 leading-tight">
            new collection
            <br />
            <span className="font-normal italic">dropping soon</span>
          </h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="shadow-elegant" asChild>
              <Link to="/collection">Shop Collection</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/lookbook">View Lookbook</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;