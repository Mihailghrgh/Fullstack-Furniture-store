"use client";
import { FaHeart } from "react-icons/fa";
import { Button } from "../ui/button";
import { useUser } from "@clerk/nextjs";
import { CardSignInButton } from "../form/Buttons";
import axios from "axios";
import { useEffect, useState } from "react";
import FavoriteToggleForm from "./FavoriteToggleForm";

function FavoriteToggleButton({ productId }: { productId: string }) {
  const [currentUser, setUser] = useState<string | null>(null);
  const [favoriteId, setFavoriteId] = useState<string | null>(null);
  const [refreshToggle, setRefreshToggle] = useState<boolean>(false);

  //getting the product Id
  //getting the currentUser to show the current products
  const user = useUser();

  useEffect(() => {
    const FetchData = async () => {
      if (!user.user?.id) {
        setUser(null);
        return;
      }
      const { data } = await axios.get(
        `/api/products?type=favorite&id=${productId}`
      );
      console.log("fetched Id Data: ", data);
      
      setUser(user?.user?.id);
      setFavoriteId(data.id);
    };
    FetchData();
  }, [currentUser, favoriteId, refreshToggle]);

  if (currentUser === null) {
    return <CardSignInButton />;
  }
  return (
    <FavoriteToggleForm
      favoriteId={favoriteId}
      productId={productId}
      onToggle={() => {
        setRefreshToggle((prev) => !prev);
        console.log(refreshToggle);
      }}
    />
  );
}
export default FavoriteToggleButton;
