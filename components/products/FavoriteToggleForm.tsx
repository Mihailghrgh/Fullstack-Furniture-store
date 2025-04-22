"use client";

import { CardSignInButton, CardSubmitButton } from "../form/Buttons";
import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "@clerk/nextjs";

type FavoriteToggleFormProps = {
  productId: string;
};

function FavoriteToggleForm({ productId }: FavoriteToggleFormProps) {
  const [favId, setFavId] = useState<string | null>(null);
  const user = useUser();

  const fetchFavorite = async () => {
    const { data } = await axios.get(
      `/api/products?type=favorite&id=${productId}`
    );
    setFavId(data?.id ?? null);
  };

  useEffect(() => {
    fetchFavorite();
  }, []);

  const handleToggle = async () => {
    try {
      if (favId) {
        await axios.post(`/api/products?type=deleteFavorite&id=${favId}`);
      } else {
        await axios.post(`/api/products?type=createFavorite&id=${productId}`);
      }
    } catch (err: any) {
      console.error("Toggle failed", err);
    }
    fetchFavorite();
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
