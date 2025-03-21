import Image from "next/image";
import hero1 from "@/public/hero1.jpg";
import hero3 from "@/public/hero3.jpg";
import hero4 from "@/public/hero4.jpg";
import hero5 from "@/public/hero5.jpg";
import hero6 from "@/public/hero6.jpg";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Card, CardContent } from "../ui/card";

const carouselImg = [hero1, hero3, hero4, hero5, hero6];

function HeroCarousel() {
  return (
    <div className="hidden lg:block">
      <Carousel>
        <CarouselContent>
          {carouselImg.map((item, index) => {
            return (
              <CarouselItem key={index}>
                <Card className="bg-accent h-full w-full">
                  <CardContent className="p-2 h-full w-full">
                    <Image
                      src={item}
                      alt="hero"
                      priority
                      className="w-full max-h-[30rem] object-cover rounded-md"
                    />
                  </CardContent>
                </Card>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="bg-accent" />
        <CarouselNext className="bg-accent" />
      </Carousel>
    </div>
  );
}
export default HeroCarousel;
