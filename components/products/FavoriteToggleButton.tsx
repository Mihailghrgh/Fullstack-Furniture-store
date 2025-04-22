"use client";

import FavoriteToggleForm from "./FavoriteToggleForm";

function FavoriteToggleButton({ productId }: { productId: string }) {
  return <FavoriteToggleForm productId={productId} />;
}
export default FavoriteToggleButton;
