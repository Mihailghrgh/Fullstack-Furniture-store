"use client";
import { FaHeart } from "react-icons/fa";
import { Button } from "../ui/button";
import { useUser } from "@clerk/nextjs";
import { CardSignInButton } from "../form/Buttons";
import axios from "axios";
import { useEffect, useState } from "react";

function FavoriteToggleButton({ productId }: { productId: string }) {
  //getting the product Id
  const prodId = productId;
  console.log(prodId);

  //getting the currentUser to show the current products
  const user = useUser();
  console.log(user);
  
  // console.log(user.user);
  // if (!user) {
  //   return <CardSignInButton />;
  // }

  // const { data } = await axios.get(`/api/products?type=featured`);
  // console.log(data);
  const [currentUser, setUser] = useState<string | null>(null);
  useEffect(() => {
    const FetchData = async () => {

      if (!user.user?.id) {
        setUser(null);
        return;
      }

      const { data } = await axios.get("/api/products?type=favorite");

      setUser(user?.user?.id);
    };
    FetchData();
  }, [currentUser]);

  console.log(currentUser);

  if (currentUser === null) {
    return <CardSignInButton />;
  }
  return (
    <Button size="icon" variant="outline">
      <FaHeart />
    </Button>
  );
}
export default FavoriteToggleButton;
