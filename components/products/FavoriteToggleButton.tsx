import { FaHeart } from "react-icons/fa";
import { Button } from "../ui/button";

function FavoriteToggleButton({ productId }: { productId: string }) {
  const prodId = productId;
  console.log(prodId);

  return (
    <Button size="icon" variant="outline">
      <FaHeart />
    </Button>
  );
}
export default FavoriteToggleButton;
