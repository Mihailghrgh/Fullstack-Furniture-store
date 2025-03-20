import Link from "next/link";
import HeroCarousel from "./HeroCarousel";
import { Button } from "../ui/button";

function Hero() {
  return (
    <section className="flex flex-col justify-center items-center gap-8">
      <div className="text-center flex flex-col justify-center items-center">
        <h1 className="font-bold text-7xl tracking-right">
          Designed beautifully.
        </h1>
        <p className="mt-8 max-w-xl text-lg leading-8 font-extralight ">
          {" "}
          Super Fly is an online furniture store that provides interior decor
          through creative and quality designs.
        </p>
        <Button asChild size="lg" className="m-10 rounded-none h-12">
          <Link href="/products"> Our Products</Link>
        </Button>
        <HeroCarousel />
      </div>
    </section>
  );
}
export default Hero;
