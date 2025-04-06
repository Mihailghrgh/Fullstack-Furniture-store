"use client";
import { FaHeart } from "react-icons/fa";
import { Button } from "../ui/button";
import { useUser } from "@clerk/nextjs";
import { CardSignInButton } from "../form/Buttons";
import axios from "axios";
import { useEffect, useState } from "react";
import FavoriteToggleForm from "./FavoriteToggleForm";

function FavoriteToggleButton({ productId }: { productId: string }) {
  return <FavoriteToggleForm productId={productId} />;
}
export default FavoriteToggleButton;
