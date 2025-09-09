import { useEffect, useState } from "react";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { type CarouselApi } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { cn } from "@/lib/utils";

const heroImages = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=1200&h=400&fit=crop",
    title: "Basketball Courts",
    description: "Professional indoor basketball facilities"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=1200&h=400&fit=crop",
    title: "Tennis Courts",
    description: "World-class tennis courts for all skill levels"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=1200&h=400&fit=crop",
    title: "Football Fields",
    description: "Full-size football fields with premium turf"
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=1200&h=400&fit=crop",
    title: "Swimming Pools",
    description: "Olympic-sized swimming pools and aquatic centers"
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=1200&h=400&fit=crop",
    title: "Indoor Sports",
    description: "Badminton, volleyball, and more indoor activities"
  }
];

const HeroCarousel = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });

    // Add keyboard navigation
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        api.scrollPrev();
      } else if (event.key === "ArrowRight") {
        api.scrollNext();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [api]);

  return (
    <section className="relative h-[350px] w-full overflow-hidden">
      <Carousel
        setApi={setApi}
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full h-full"
      >
        <CarouselContent className="h-full">
          {heroImages.map((slide) => (
            <CarouselItem key={slide.id} className="h-full">
              <div className="relative h-full">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />
                <div className="absolute inset-0 flex items-center justify-center text-center text-white">
                  <div className="max-w-4xl px-4 space-y-4">
                    <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                      {slide.title}
                    </h1>
                    <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
                      {slide.description}
                    </p>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      
      {/* Dot indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            className={cn(
              "w-3 h-3 rounded-full transition-all duration-200",
              current === index 
                ? "bg-white" 
                : "bg-white/50 hover:bg-white/75"
            )}
            onClick={() => api?.scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroCarousel;