import { Button } from "../ui/button";
import Link from "next/link";

function Logo() {
  return (
    <Button size="lg" asChild className="bg-primary">
      <div className="flex justify-center">
        <Link href="/" className="">
          <h1 >Super Fly</h1>
        </Link>
      </div>
    </Button>
  );
}
export default Logo;
