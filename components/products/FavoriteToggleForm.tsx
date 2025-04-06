"use client";

import { FaHeart } from "react-icons/fa";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import FormContainer from "../form/FormContainer";
import { CardSignInButton, CardSubmitButton } from "../form/Buttons";
import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "@clerk/nextjs";

type FavoriteToggleFormProps = {
  productId: string;
  favoriteId: string | null;
  onToggle: () => void;
};

function FavoriteToggleForm({
  favoriteId,
  productId,
  onToggle,
}: FavoriteToggleFormProps) {
  const [favId, setFavId] = useState<string | null>(null);
  const user = useUser();

  const fetchFavorite = async () => {
    const user = useUser();
    const { data } = await axios.get(
      `/api/products?type=favorite&id=${productId}`
    );

    setFavId(data?.id ?? null);
  };

  useEffect(() => {
    fetchFavorite();
  });

  const handleToggle = async () => {
    try {
      if (favoriteId) {
        await axios.post(`/api/products?type=deleteFavorite&id=${favoriteId}`);
      } else {
        await axios.post(`/api/products?type=createFavorite&id=${productId}`);
      }
    } catch (err) {
      console.error("Toggle failed", err);
    }
  };

  if (!user.user?.id) {
    return <CardSignInButton />;
  }

  return (
    <CardSubmitButton
      handleToggle={handleToggle}
      isFavorite={favId ? true : false}
    />
  );
}
export default FavoriteToggleForm;
